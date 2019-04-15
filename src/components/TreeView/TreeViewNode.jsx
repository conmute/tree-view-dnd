/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import * as _ from 'lodash';

import { nodeTypes, dropTypes } from './helpers';

class TreeViewNode extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {};
  }

  chooseNode() {
    const { onChoose } = this.props;
    onChoose();
  }

  expandNode() {

    const { onExpand, expanded, type } = this.props;

    if (type === nodeTypes.FOLDER) {
      onExpand(!expanded);
    }
  }

  selectNode() {
    const { onSelect, selected } = this.props;
    onSelect(!selected);
  }

  handleNodeClick(e) {

    const { type } = this.props;

    if (type === nodeTypes.FOLDER) return;

    if (e.ctrlKey || e.metaKey) {
      this.selectNode();
      return;
    }

    this.chooseNode();
  }

  handleSwitchClick(e) {
    this.expandNode();
    e.stopPropagation();
  }

  handleKeyPress(e) {
    switch (e.charCode) {
      case 13: { // Enter
        this.handleNodeClick(e);
        return;
      }
      case 32: { // Space
        this.selectNode();
        return;
      }
      case 27: { // Esc
        const { editing, onCancelEditing } = this.props;
        if (editing) onCancelEditing();
        return;
      }
      default:
        return;
    }
  }

  handleInputKeyPress(e) {
    switch (e.charCode) {
      case 13: { // Enter
        const { editing, onSubmitEditing } = this.props;
        if (editing) onSubmitEditing(e.target.value);
        e.stopPropagation();
        return;
      }
      case 32: { // Space
        e.stopPropagation();
        return;
      }
      case 27: { // Esc
        const { editing, onCancelEditing } = this.props;
        if (editing) onCancelEditing();
        return;
      }
      default:
        return;
    }
  }

  handleEscPress(e) {
    if (e.keyCode === 27) {
      const { editing, onCancelEditing } = this.props;
      if (editing) onCancelEditing();
    }
  }

  handleNodeDoubleClick(e) {

    const { onStartEditing } = this.props;
    onStartEditing();

    setTimeout(() => {
      this.textInput.focus();
      this.textInput.select();
    });
  }

  handleClickOutside() {
    const { editing, onSubmitEditing } = this.props;
    if (editing) onSubmitEditing(this.textInput.value);
  }

  handleDragStart(e) {
    const { onDragStart } = this.props;
    onDragStart(e);
  }

  handleDrop(e) {
    const { onDrop } = this.props;
    onDrop(e);
  }

  handleDragEnd(e) {
    const { onDragEnd } = this.props;
    onDragEnd(e);
  }

  render() {

    const {
      id, name, type, current, selected, dragOver,
      draggable, expanded, editing, orderPath, children
    } = this.props;

    return (
      <div className={classnames(
        'tv-node',
        `tv-node_deep-level-${orderPath.length - 1}`,
        {
          'tv-node_folder': type === nodeTypes.FOLDER,
          'tv-node_selected': selected,
          'tv-node_expanded': expanded,
          'tv-node_current': current,
          'tv-node_editing': editing,
          'tv-node_drag-over': !_.isNull(dragOver),
          'tv-node_draggable': draggable,
        }
      )}>

        {
          dragOver === dropTypes.BEFORE && (
            <div
              data-id={id}
              onDragOver={e => e.preventDefault()}
              onDrop={this.handleDrop}
              className={classnames(
                'tv-node__content',
                'tv-node__content_fake'
              )} />
          )
        }

        <div
          onClick={this.handleNodeClick}
          onKeyPress={this.handleKeyPress}
          onDragStart={this.handleDragStart}
          onDragOver={e => e.preventDefault()}
          onDrop={this.handleDrop}
          onDragEnd={this.handleDragEnd}
          role="button"
          draggable
          tabIndex={0}
          data-id={id}
          data-order-path={orderPath}
          className="tv-node__content">

          <div
            role="button"
            onClick={this.handleSwitchClick}
            className="tv-node__switcher">
            <span
              className={classnames('fa', {
                'fa-caret-down': expanded,
                'fa-caret-right': !expanded,
              })}
              aria-hidden="true" />
          </div>

          <div className="tv-node__icon">
            <span
              className={classnames('fa', {
                'fa-folder-open-o': type === nodeTypes.FOLDER,
                'fa-file-o': type !== nodeTypes.FOLDER,
              })}
              aria-hidden="true" />
          </div>

          {editing
            ? (
              <input
                onKeyPress={this.handleInputKeyPress}
                ref={(input) => { this.textInput = input; }}
                className="tv-node__input"
                defaultValue={name}
                type="text" />
            )
            : (
              <div
                className="tv-node__title"
                onDoubleClick={this.handleNodeDoubleClick}>
                <span>{name}</span>
              </div>
            )}

        </div>

        {
          dragOver === dropTypes.AFTER && (
            <div
              data-id={id}
              onDragOver={e => e.preventDefault()}
              onDrop={this.handleDrop}
              className={classnames(
                'tv-node__content',
                'tv-node__content_fake'
              )} />
          )
        }

        {expanded && <div className="tv-node__children">{children}</div>}

      </div>
    );
  }
}

TreeViewNode.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  dragOver: PropTypes.oneOf([
    dropTypes.BEFORE,
    dropTypes.IN,
    dropTypes.AFTER
  ]),
  expanded: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  orderPath: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  onChoose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onCancelEditing: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

TreeViewNode.defaultProps = {
  children: null,
  dragOver: null,
};

export default enhanceWithClickOutside(TreeViewNode);
