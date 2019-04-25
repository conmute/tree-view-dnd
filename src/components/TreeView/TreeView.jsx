import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import * as _ from 'lodash';

import './style.styl';

import Draggable from './Draggable.jsx';

export const nodeTypes = {
  FOLDER: 'FOLDER',
  PAGE: 'PAGE',
};

const inRange = (n, from, to) => n >= from && n <= to;

const getShiftedRange = (shift, lastOrder, nextOrder) => ({
  from: shift > 0 ? lastOrder + 1 : nextOrder,
  to: shift > 0 ? nextOrder : lastOrder,
});

const cookData = (nextData, expandedIds = []) => {

  const data = [...nextData];

  const collapsedIds = data
    .filter(x => x.type === nodeTypes.FOLDER)
    .filter(x => expandedIds.indexOf(x.parentId) === -1)
    .map(x => x.id);

  return data.filter(x => collapsedIds.indexOf(x.parentId) === -1);
};

class TreeView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    const { data: rawData } = this.props;

    const data = rawData.map((x, order) => ({ ...x, shift: 0, order }));
    const cookedData = cookData(data);

    this.state = {
      data,
      cookedData,
      expandedIds: [],
      instant: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { expandedIds } = this.state;
    console.log('data: ', cookData(nextProps.data, expandedIds));
  }

  handleDrag({ shift }, node) {
    this.shiftOtherNodes(shift, node.order);
  }

  handleDrop({ shift }, node) {

    const { data } = this.state;

    const lastOrder = node.order;
    const nextOrder = node.order + shift;

    const { from, to } = getShiftedRange(shift, lastOrder, nextOrder);

    const nextData = data
      .map(x => ({ ...x, shift: 0 }))
      .map(x => (inRange(x.order, from, to) ? { ...x, order: x.order - Math.sign(shift) } : x))
      .map(x => (x.id === node.id ? { ...x, order: nextOrder } : x))
      .sort((a, b) => a.order - b.order);

    const cookedData = cookData(nextData);

    this.setState({
      data: nextData,
      cookedData,
      instant: true
    }, () => setTimeout(() => this.setState({ instant: false })));
  }

  shiftOtherNodes(shift, order) {

    const { data } = this.state;

    const lastOrder = order;
    const nextOrder = order + shift;

    const { from, to } = getShiftedRange(shift, lastOrder, nextOrder);
    const nextData = data.map(x => ({ ...x, shift: inRange(x.order, from, to) ? -Math.sign(shift) : 0 }));
    const cookedData = cookData(nextData);

    this.setState({
      data: nextData,
      cookedData,
    });

  }

  render() {
    const { cookedData, instant } = this.state;
    const count = cookedData.length;
    return (
      <div className="tree-view">
        {
          cookedData.map((node, order) => (
            <Draggable
              key={node.id}
              instant={instant}
              shift={node.shift}
              minShift={-order}
              maxShift={count - order - 1}
              onDrag={ev => this.handleDrag(ev, node)}
              onDragEnd={ev => this.handleDrop(ev, node)}>
              <div className="tv-node__content">
                {node.name}
              </div>
            </Draggable>
          ))
        }
      </div>
    );
  }
}

TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

TreeView.defaultProps = {};

export default TreeView;
