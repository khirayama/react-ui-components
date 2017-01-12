import React, {Component, PropTypes} from 'react';

const TRANSITION_TIME = 175;

export class PullBox extends Component {
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
    this._updateTouchStartView();

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

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };
  }
  _updateTouchStartView() {
    this.pullBoxMessage.classList.remove('pull-box-message__pulled');
  }
  _updateTouchMoveView() {
    const diff = this._calcDiff();

    if (window.innerHeight / 4 < Math.abs(diff.y)) {
      this.pullBoxMessage.classList.add('pull-box-message__pulled');
    } else {
      this.pullBoxMessage.classList.remove('pull-box-message__pulled');
    }
    this.pullBoxContent.style.transitionProperty = 'none';
    this.pullBoxContent.style.transform = `translateY(${diff.y}px)`;
  }
  _updateTouchEndView() {
    this.pullBoxContent.style.transition = '175ms ease-out';
    this.pullBoxContent.style.transitionProperty = 'transform';
    this.pullBoxContent.style.transform = `translateY(${this.pullBoxMessage.offsetHeight}px)`;

    this.props.onRelease(() => {
      this.pullBoxContent.style.transform = `translateY(0px)`;
    });
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
  render() {
    return (
      <section className="pull-box">
        <div
          className="pull-box-content"
          ref={(pullBoxContent) => this.pullBoxContent = pullBoxContent}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          >
          <div
            className="pull-box-message"
            ref={(pullBoxMessage) => this.pullBoxMessage = pullBoxMessage}
            >Release it</div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

PullBox.childContextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};
