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
  inRange,
  inArray,
  getShiftedRange,
  cookData,
} from './helpers';

class TreeView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    const { data: rawData } = this.props;

    const data = rawData.map((x, order) => ({ ...x, shift: 0, order }));
    const expandedIds = data.map(x => x.id); // temp
    const cookedData = cookData(data, expandedIds);

    this.state = {
      data,
      cookedData,
      expandedIds,
      instant: false,
    };
  }

  handleDrag({ shift }, node) {

    const { data, expandedIds } = this.state;

    const lastOrder = node.cookOrder;
    const nextOrder = node.cookOrder + shift;

    const { from, to } = getShiftedRange(shift, lastOrder, nextOrder);

    const nextData = data.map((x) => {
      const isInRange = inRange(x.cookOrder, from, to);
      return { ...x, shift: isInRange ? -Math.sign(shift) : 0 };
    });

    const cookedData = cookData(nextData, expandedIds);

    this.setState({
      data: nextData,
      cookedData,
    });
  }

  handleDrop({ shift }, node) {

    const { data, expandedIds } = this.state;

    const lastOrder = node.cookOrder;
    const nextOrder = node.cookOrder + shift;

    const { from, to } = getShiftedRange(shift, lastOrder, nextOrder);

    const nextData = data
      .map(x => ({ ...x, shift: 0 }))
      .map((x) => {
        const isInRange = inRange(x.cookOrder, from, to);
        const shiftedOrder = x.cookOrder - Math.sign(shift);
        return isInRange ? { ...x, cookOrder: shiftedOrder } : x;
      })
      .map(x => (x.id === node.id ? { ...x, cookOrder: nextOrder } : x))
      .sort((a, b) => a.cookOrder - b.cookOrder);

    const cookedData = cookData(nextData, expandedIds);

    this.setState({
      data: nextData,
      cookedData,
      instant: true
    }, () => setTimeout(() => this.setState({ instant: false })));
  }

  handleSwitchClick(id) {

    const { data, expandedIds } = this.state;

    const nextExpandedIds = inArray(expandedIds, id)
      ? expandedIds.filter(x => x !== id)
      : [...expandedIds, id];

    const cookedData = cookData(data, nextExpandedIds);

    this.setState({
      expandedIds: nextExpandedIds,
      cookedData
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
              <div className={`
                  tv-node tv-node_deep-level-${node.deep}
                  ${node.odd ? 'tv-node_odd' : ''
                }`}>

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
                    <span>{node.name}</span>
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
