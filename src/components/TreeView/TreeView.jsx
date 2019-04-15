import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import * as _ from 'lodash';

import './style.styl';

import {
  getPreparedData,
  getFirstChapterId,
  findParentElement,
  reorder,
  createDragImage,
  removeDragImage,
  isFolder,
} from './helpers';

import TreeViewNode from './TreeViewNode.jsx';
import DragImage from '../DragImage';

const NODE_SELECTOR = '.tv-node__content';
const TREE_VIEW_SELECTOR = '.tree-view';

class TreeView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.openFolderTimer = null;
    this.movedNode = null;

    this.state = {
      data: [],
      tree: [],
      currentChapterId: null,

    };
  }

  componentDidMount() {

    const { data } = this.props;

    const {
      treeData,
      preparedData,
      currentChapterId
    } = getPreparedData(data, []);

    this.setState({ data: preparedData, tree: treeData, currentChapterId });
  }

  componentWillReceiveProps(nextProps) {

    const { data: nextData } = nextProps;

    const {
      data: prevData,
      currentChapterId: prevCurrentId
    } = this.state;

    let currentChapterId = prevCurrentId;

    const {
      treeData,
      preparedData
    } = getPreparedData(nextData, [], currentChapterId);

    // Choose other chapter if currentChapter has been deleted
    if (nextData.findIndex(x => x.id === currentChapterId) === -1) {
      currentChapterId = getFirstChapterId(nextData, treeData);
      // bus.DISPATCH(selectScreens(currentChapterId));
    }

    this.setState({ data: preparedData, tree: treeData, currentChapterId });
  }

  selectNode(id, value) {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, selected: x.id === id ? value : x.selected }));
    this.setState({ data: nextData });
  }

  deselectAll() {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, selected: false }));
    this.setState({ data: nextData });
  }

  expandNode(id, value) {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, expanded: x.id === id ? value : x.expanded }));
    this.setState({ data: nextData });
  }

  chooseChapter(id) {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, current: x.id === id, selected: false }));
    this.setState({ data: nextData, currentChapterId: id });
    // bus.DISPATCH(selectScreens(id));
  }

  dragOverNode(id, value) {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, dragOver: x.id === id ? value : false }));
    this.setState({ data: nextData });
  }

  draggableNode(id, value) {

    const { data } = this.state;

    const nextData = data.map(x => ({
      ...x,
      draggable: x.id === id ? value : x.draggable,
      dragOver: x.id === id ? value : false,
    }));

    this.setState({ data: nextData });
  }

  startEditing(id) {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, editing: x.id === id }));
    this.setState({ data: nextData });
  }

  cancelEditing() {
    const { data } = this.state;
    const nextData = data.map(x => ({ ...x, editing: false }));
    this.setState({ data: nextData });
  }

  submitEditing(id, name) {
    const { data } = this.state;
    const nextData = data.map(x => ({
      ...x,
      editing: false,
      name: x.id === id ? name : x.name,
    }));
    this.setState({ data: nextData });
    // bus.DISPATCH(updateChapter(id, name));
  }

  takeNode(id) {
    const { data } = this.state;
    return data.find(x => x.id === id);
  }

  createDndListeners() {
    const treeViewElement = document.querySelector(TREE_VIEW_SELECTOR);
    treeViewElement.addEventListener('dragenter', this.handleDragEnter, false);
    treeViewElement.addEventListener('dragleave', this.handleDragLeave, false);
    treeViewElement.addEventListener('dragover', this.handleDragOver, false);
  }

  removeDndListeners() {
    const treeViewElement = document.querySelector(TREE_VIEW_SELECTOR);
    treeViewElement.removeEventListener('dragenter', this.handleDragEnter, false);
    treeViewElement.removeEventListener('dragleave', this.handleDragLeave, false);
    treeViewElement.removeEventListener('dragover', this.handleDragOver, false);
  }

  handleDragStart(id, e) {

    const { data } = this.state;
    const selectedDataIds = data
      .filter(x => x.selected)
      .map(x => x.id);

    const count = selectedDataIds.length;

    if (selectedDataIds.indexOf(id) !== -1) {

      const element = document.createElement('div');

      ReactDOM.render(<DragImage count={count} />, element, () => {
        document.body.append(element);
        e.dataTransfer.setDragImage(element, 0, 0);
      });
    }

    this.createDndListeners();
    const nodeElement = findParentElement(e.target, NODE_SELECTOR, TREE_VIEW_SELECTOR);
    const dragImage = createDragImage(nodeElement, id);
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    this.movedNode = { id };

    setTimeout(() => this.draggableNode(id, true));

  }

  handleDragEnter(e) {

    const nodeElement = findParentElement(e.target, NODE_SELECTOR, TREE_VIEW_SELECTOR);

    if (!nodeElement) return;

    const { data } = this.state;
    const nodeId = nodeElement.dataset.id;
    const node = data.find(x => x.id === nodeId);

    if (isFolder(node)) {
      setTimeout(() => {

        if (this.openFolderTimer) {
          clearTimeout(this.openFolderTimer);
          this.openFolderTimer = null;
        }

        this.openFolderTimer = setTimeout(() => this.expandNode(nodeId, true), 1000);
      });
    }

    this.dragOverNode(nodeId, true);
  }

  handleDragLeave(e) {

    const nodeElement = findParentElement(
      e.target,
      NODE_SELECTOR,
      TREE_VIEW_SELECTOR
    );

    if (!nodeElement) return;

    const { data } = this.state;
    const nodeId = nodeElement.dataset.id;
    const node = data.find(x => x.id === nodeId);

    clearTimeout(this.openFolderTimer);
    this.openFolderTimer = null;
  }

  handleDragOver(e) {
    // this.
  }

  handleDrop(id) {

    const { data, currentChapterId } = this.state;

    const nextData = reorder(data, this.movedNode.id, id);
    const { treeData, preparedData } = getPreparedData(nextData, data, currentChapterId);

    this.movedNode = null;
    this.setState({ data: preparedData, tree: treeData });
  }

  handleDragEnd(e) {

    const nodeElement = findParentElement(
      e.target,
      NODE_SELECTOR,
      TREE_VIEW_SELECTOR
    );

    const nodeId = nodeElement.dataset.id;

    setTimeout(() => {
      this.draggableNode(nodeId, false);
      this.dragOverNode(null, false);
    });

    removeDragImage(nodeId);
    this.removeDndListeners();
  }

  buildTree(tree, orderPath = []) {
    return tree.map((link, order) => {

      const node = this.takeNode(link.id);
      const newOrderPath = [...orderPath, order];

      return (
        <TreeViewNode
          id={node.id}
          key={node.id}
          name={node.name}
          type={node.type}
          current={node.current}
          selected={node.selected}
          order={node.order}
          draggable={node.draggable}
          dragOver={node.dragOver}
          expanded={node.expanded}
          editing={node.editing}
          orderPath={newOrderPath}
          onChoose={() => this.chooseChapter(node.id)}
          onExpand={value => this.expandNode(node.id, value)}
          onSelect={value => this.selectNode(node.id, value)}
          onStartEditing={() => this.startEditing(node.id)}
          onCancelEditing={() => this.cancelEditing(node.id)}
          onSubmitEditing={value => this.submitEditing(node.id, value)}
          onDragStart={e => this.handleDragStart(node.id, e)}
          onDrop={e => this.handleDrop(node.id, e)}
          onDragEnd={e => this.handleDragEnd(e)}>
          {link.children && this.buildTree(link.children, newOrderPath)}
        </TreeViewNode>
      );
    });
  }

  render() {
    const { tree } = this.state;
    return (
      <div className="tree-view">
        {this.buildTree(tree)}
      </div>
    );
  }
}

TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

TreeView.defaultProps = {};

export default TreeView;
