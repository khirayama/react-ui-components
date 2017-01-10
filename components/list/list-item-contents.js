import React, {Component, PropTypes} from 'react';

const THRESHOLD_WIDTH = 120;
const THRESHOLD_DELTA = 0.8;

export class ListItemContent extends Component {
  constructor() {
    super();

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }
  _handleTouchStart(event) {
    this.touch = Object.assign({}, this.touch, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    });
  }
  _handleTouchMove(event) {
    const distance = Math.sqrt(
      Math.pow(event.touches[0].clientX - this.touch.startX, 2) +
      Math.pow(event.touches[0].clientY - this.touch.startY, 2)
    );

    if (distance > 10) {
      clearTimeout(this.touch.timerId);

      this.touch = Object.assign({}, this.touch, {
        endX: event.touches[0].clientX,
        endY: event.touches[0].clientY,
        endTime: new Date(),
      });

      this._updateTouchMoveView();
    }
  }
  _handleTouchEnd() {
    this._updateTouchEndView();
    const currentIndex = this._calcCurrentIndex();

    if (this._isRightSwipe()) {
      setTimeout(() => {
        this.context.onSwipeRight(currentIndex);
      }, 200);
    } else if (this._isLeftSwipe()) {
      setTimeout(() => {
        this.context.onSwipeLeft(currentIndex);
      }, 200);
    }

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };
  }
  _updateTouchMoveView() {
    const diff = this._calcDiff();

    if (!this.context.holding()) {
      this.listItemContent.style.transform = `translateX(${diff.x}px)`;
    }
  }
  _updateTouchEndView() {
    const diff = this._calcDiff();

    this.listItemContent.style.transitionProperty = 'transform';

    if (this._isRightSwipe()) {
      this.listItemContent.style.transform = `translateX(100%)`;
    } else if (this._isLeftSwipe()) {
      this.listItemContent.style.transform = `translateX(-100%)`;
    } else {
      this.listItemContent.style.transform = `translateX(0px)`;
    }
  }
  _isLeftSwipe() {
    const diff = this._calcDiff();

    return (
      (Math.abs(diff.x) > THRESHOLD_WIDTH && diff.x < 0) ||
      (Math.abs(diff.delta.x) > THRESHOLD_DELTA && diff.x < 0)
    );
  }
  _isRightSwipe() {
    const diff = this._calcDiff();

    return (
      (Math.abs(diff.x) > THRESHOLD_WIDTH && 0 < diff.x) ||
      (Math.abs(diff.delta.x) > THRESHOLD_DELTA && 0 < diff.delta.x)
    );
  }
  _calcDiff() {
    let x = this.touch.endX - this.touch.startX;
    let y = this.touch.endY - this.touch.startY;
    let time = this.touch.endTime.getTime() - this.touch.startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.touch.endX === null || this.touch.endY === null) {
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
  _calcCurrentIndex() {
    const diff = this._calcDiff();
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    let currentIndex = null;

    for (let index = 0; index < listItemElements.length; index++) {
      const listItemElement = listItemElements[index];
      const scrollTop = listElement.scrollTop;
      const targetRect = {
        top: listElement.offsetTop + listItemElement.offsetTop,
        height: listItemElement.offsetHeight,
      };

      if (
        targetRect.top - scrollTop < this.touch.endY &&
        this.touch.endY < targetRect.top + targetRect.height - scrollTop
      ) {
        currentIndex = index;
        break;
      }
    }

    return currentIndex;
  }
  render() {
    return (
      <div
        className="list-item-content"
        ref={(listItemContent) => this.listItemContent = listItemContent}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</div>
    );
  }
}

ListItemContent.contextTypes = {
  listElement: PropTypes.func,
  holding: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
};

export class ListItemLeftBackground extends Component {
  render() {
    return (
      <div
        className="list-item-background list-item-left-background"
        >{this.props.children}</div>
    );
  }
}

export class ListItemRightBackground extends Component {
  render() {
    return (
      <div
        className="list-item-background list-item-right-background"
        >{this.props.children}</div>
    );
  }
}
