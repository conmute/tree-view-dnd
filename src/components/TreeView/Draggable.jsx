/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import * as _ from 'lodash';

import { findParentElement, cutNumber } from './helpers';

export default class Draggable extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isDragging: false,
      originalX: 0,
      originalY: 0,
      translateY: 0,
      xShift: 0,
      shift: props.shift,
    };
  }

  componentWillReceiveProps(nextProps) {

    const { isDragging } = this.state;

    if (isDragging) return;

    const { clientHeight } = this.selfElement;
    const { shift } = nextProps;
    const nextTranslateY = shift * clientHeight;

    this.setState({
      translateY: nextTranslateY,
      shift
    });
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown({ clientX, clientY }) {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY
    });
  }

  handleMouseMove({ clientX, clientY }) {

    const { onDrag, minShift, maxShift } = this.props;
    const {
      shift,
      xShift,
      originalX,
      originalY
    } = this.state;

    const translateX = clientX - originalX;
    const translateY = clientY - originalY;

    const { clientWidth, clientHeight } = this.selfElement;
    const nextXShift = Math.round(translateX / clientWidth * 10);
    const nextShift = cutNumber(Math.round(translateY / clientHeight), minShift, maxShift);

    if (nextShift === shift && nextXShift === xShift) return;

    const nextTranslateY = nextShift * clientHeight;

    this.setState({
      translateY: nextTranslateY,
      xShift: nextXShift,
      shift: nextShift,
      isDragging: true,
    }, () => { if (onDrag) onDrag({ xShift: nextXShift, yShift: nextShift }); });
  }

  handleMouseUp(ev) {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    const { isDragging } = this.state;

    if (!isDragging) return;

    ev.stopPropagation();

    const { shift } = this.state;
    const { onDragEnd } = this.props;
    if (onDragEnd) onDragEnd({ shift });

    this.setState({
      originalY: 0,
      translateY: 0,
      shift: 0,
      isDragging: false
    });
  }

  render() {
    const { children, instant } = this.props;
    const { translateY, isDragging } = this.state;

    const nextStyle = {};

    nextStyle.position = 'relative';

    if (!instant) {
      nextStyle.transition = 'transform .15s';
    }

    nextStyle.transform = `translate(0px, ${translateY}px)`;
    nextStyle.WebkitTransform = nextStyle.transform;

    return (
      <div
        ref={(el) => { this.selfElement = el; }}
        onMouseDown={this.handleMouseDown}
        className={classnames('grabbable', { dragging: isDragging })}
        style={nextStyle}>
        {children}
      </div>
    );
  }
}

Draggable.propTypes = {
  instant: PropTypes.bool,
  shift: PropTypes.number,
  minShift: PropTypes.number,
  maxShift: PropTypes.number,
  children: PropTypes.node.isRequired,
  onDragEnd: PropTypes.func,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
};

Draggable.defaultProps = {
  instant: false,
  shift: 0,
  minShift: -9999,
  maxShift: 9999,
  onDragEnd: () => { },
  onDrag: () => { },
  onDragStart: () => { },
};
