/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

import './style.styl';

import Draggable from './Draggable.jsx';

import {
  nodeTypes,
  getDeepValue,
  inRange,
  inArray,
  getShiftedRange,
} from './helpers';

import {
  getPreparedData,
  getTreeStructure,
} from './prepareData';

class TreeView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    const { data: rawData } = this.props;

    const data = getPreparedData(rawData);
    // const expandedIds = data.map(x => x.id); // temp
    const expandedIds = [];
    const treeStructure = getTreeStructure(data);

    this.state = {
      data,
      treeStructure,
      expandedIds,
      instant: false,
    };
  }

  handleDrag({ xShift, yShift }, node) {

    const { treeStructure, expandedIds } = this.state;

    const lastOrder = node.treeOrder;
    const nextOrder = node.treeOrder + yShift;

    const yDirection = Math.sign(yShift);
    const correctionValue = yDirection <= 0 ? -1 : 0;
    const { dropOptions } = treeStructure[nextOrder + correctionValue];

    const nextDeep = getDeepValue(dropOptions, node.deep, xShift);

    const { from, to } = getShiftedRange(yShift, lastOrder, nextOrder);

    const nextTreeStructure = treeStructure.map((x) => {

      const isInRange = inRange(x.treeOrder, from, to);
      const shift = isInRange ? -yDirection : 0;
      const deep = x.id === node.id ? nextDeep : x.deep;

      return { ...x, shift, deep };
    });

    this.setState({
      treeStructure: nextTreeStructure,
    });
  }

  handleDrop({ shift }, node) {

    const { data, expandedIds } = this.state;

    const lastOrder = node.treeOrder;
    const nextOrder = node.treeOrder + shift;

    const { from, to } = getShiftedRange(shift, lastOrder, nextOrder);

    const nextData = data
      .map(x => ({ ...x, shift: 0 }))
      .map((x) => {
        const isInRange = inRange(x.treeOrder, from, to);
        const shiftedOrder = x.treeOrder - Math.sign(shift);
        return isInRange ? { ...x, treeOrder: shiftedOrder } : x;
      })
      .map(x => (x.id === node.id ? { ...x, treeOrder: nextOrder } : x))
      .sort((a, b) => a.treeOrder - b.treeOrder);

    const treeStructure = getTreeStructure(nextData, expandedIds);

    this.setState({
      data: nextData,
      treeStructure,
      instant: true
    }, () => setTimeout(() => this.setState({ instant: false })));
  }

  handleSwitchClick(id) {

    const { data, expandedIds } = this.state;

    const nextExpandedIds = inArray(expandedIds, id)
      ? expandedIds.filter(x => x !== id)
      : [...expandedIds, id];

    const treeStructure = getTreeStructure(data, nextExpandedIds);

    this.setState({
      expandedIds: nextExpandedIds,
      treeStructure
    });
  }

  render() {
    const { treeStructure, instant } = this.state;
    const count = treeStructure.length;
    return (
      <div className="tree-view">
        {
          treeStructure.map((node, order) => (
            <Draggable
              key={node.id}
              instant={instant}
              shift={node.shift}
              minShift={-order}
              maxShift={count - order - 1}
              onDrag={ev => this.handleDrag(ev, node)}
              onDragEnd={ev => this.handleDrop(ev, node)}>

              <div className={`
                  tv-node
                  tv-node_deep-level-${node.deep}
                  ${node.odd ? 'tv-node_odd' : ''}
                `}>

                <div
                  className="tv-node__content">

                  {
                    node.type === nodeTypes.FOLDER && (
                      <div
                        role="button"
                        onClick={() => this.handleSwitchClick(node.id)}
                        className="tv-node__switcher">
                        <span
                          className={classnames('fa', {
                            'fa-caret-down': node.expanded,
                            'fa-caret-right': !node.expanded,
                          })}
                          aria-hidden="true" />
                      </div>
                    )
                  }

                  <div className="tv-node__icon">
                    <span
                      className={classnames('fa', {
                        'fa-folder-open-o': node.type === nodeTypes.FOLDER,
                        'fa-file-o': node.type !== nodeTypes.FOLDER,
                      })}
                      aria-hidden="true" />
                  </div>

                  <div className="tv-node__title">
                    <span>
                      {`${node.treeOrder} | ${node.name}`}
                    </span>
                  </div>

                </div>
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
