import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class TabContentList extends Component {
  constructor() {
    super();

    this.touch = {
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _moving: false,
      _transitionProperty: 'left .2s ease-out',
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }
  getChildContext() {
    return {
      handleTouchStart: this.handleTouchStart,
      handleTouchMove: this.handleTouchMove,
      handleTouchEnd: this.handleTouchEnd,
    };
  }
  _handleTouchStart(event) {
    event.stopPropagation();

    this.touch = Object.assign({}, this.touch, {
      _startX: event.touches[0].clientX,
      _startY: event.touches[0].clientY,
      _startTime: new Date(),
      _transitionProperty: 'none',
    });
  }
  _handleTouchMove(event) {
    event.stopPropagation();

    this.touch = Object.assign({}, this.touch, {
      _endX: event.touches[0].clientX,
      _endY: event.touches[0].clientY,
      _endTime: new Date(),
      _moving: true,
      _transitionProperty: 'none',
    });

    this._updateTouchMoveView();
  }
  _handleTouchEnd(event) {
    event.stopPropagation();

    this._updateTouchEndView();

    const THRESHOLD_WIDTH = window.screen.width / 3;
    const THRESHOLD_DELTAX = 0.6;

    const diff = this._getDiff();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    }

    this.touch = Object.assign({}, this.touch, {
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _moving: false,
      _transitionProperty: 'left .2s ease-out',
    });

    this.tabContentList.style.transition = this.touch._transitionProperty;
  }
  _getDiff() {
    let x = this.touch._endX - this.touch._startX;
    let y = this.touch._endY - this.touch._startY;
    let time = this.touch._endTime.getTime() - this.touch._startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.touch._endX !== null && this.touch._endY !== null) {
      if (this.context.currentIndex === 0 && x > 0) {
        x = 0;
      } else if (this.context.currentIndex === this.props.children.length - 1 && x < 0) {
        x = 0;
      }
    } else {
      x = 0;
      y = 0;
    }
    return {
      x,
      y,
      time,
      delta: {
        x: Number((x / time).toFixed(2)),
        y: Number((y / time).toFixed(2)),
      },
    };
  }
  _swipeLeftHandler() {
    this.context.setCurrentIndex(this.context.currentIndex + 1);
  }
  _swipeRightHandler() {
    this.context.setCurrentIndex(this.context.currentIndex - 1);
  }
  _updateTouchMoveView() {
    const diff = this._getDiff();

    if (this.touch._moving && diff.x !== 0) {
      this.tabContentList.classList.add('tab-content-list__moving');
    }

    this.tabContentList.style.left = `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`;
    this.tabContentList.style.transition = this.touch._transitionProperty;
  }
  _updateTouchEndView() {
    const diff = this._getDiff();

    if (this.tabContentList.classList.contains('tab-content-list__moving')) {
      this.tabContentList.classList.remove('tab-content-list__moving');
    }

    this.tabContentList.style.left = `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`;
    this.tabContentList.style.transition = this.touch._transitionProperty;
  }
  render() {
    const diff = this._getDiff();
    const style = {
      width: (this.props.children.length * 100) + '%',
      left: `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`,
      transition: this.touch._transitionProperty,
    };

    return (
      <ul
        className='tab-content-list'
        style={style}
        ref={(tabContentList) => this.tabContentList = tabContentList}
        >{this.props.children}</ul>
    );
  }
}

TabContentList.childContextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
};

TabContentList.contextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

TabContentList.propTypes = {
  children: PropTypes.node,
};

export class TabContentListItem extends Component {
  render() {
    return (
      <li
        onTouchStart={this.context.handleTouchStart}
        onTouchMove={this.context.handleTouchMove}
        onTouchEnd={this.context.handleTouchEnd}
        className="tab-content-list-item"
        >{this.props.children}</li>
    );
  }
}

TabContentListItem.contextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  currentIndex: PropTypes.number,
};

TabContentListItem.propTypes = {
  children: PropTypes.node,
};

import {Tab} from './tab';
import {TabList} from './tab-list';
import {TabListItem} from './tab-list-item';
export {
  Tab,
  TabList,
  TabListItem,
};
