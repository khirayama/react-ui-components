import React, {Component, PropTypes} from 'react';

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

    this.setPullBox = this._setPullBox.bind(this);
    this.setPullBoxContent = this._setPullBoxContent.bind(this);
    this.setPullBoxMessage = this._setPullBoxMessage.bind(this);
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
    if (diff.y > 0 && this.pullBox.scrollTop < 20) {
      this.pullBoxContent.style.transitionProperty = 'none';
      this.pullBoxContent.style.transform = `translateY(${diff.y}px)`;
    }
  }
  _updateTouchEndView() {
    const diff = this._calcDiff();

    if (window.innerHeight / 4 < Math.abs(diff.y)) {
      this.pullBoxContent.style.transition = '175ms ease-out';
      this.pullBoxContent.style.transitionProperty = 'transform';
      this.pullBoxContent.style.transform = `translateY(${this.pullBoxMessage.offsetHeight}px)`;

      this.props.onRelease(() => {
        this.pullBoxContent.style.transform = `translateY(0px)`;
      });
    }
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
  _setPullBox(pullBox) {
    this.pullBox = pullBox;
  }
  _setPullBoxContent(pullBoxContent) {
    this.pullBoxContent = pullBoxContent;
  }
  _setPullBoxMessage(pullBoxMessage) {
    this.pullBoxMessage = pullBoxMessage;
  }
  render() {
    return (
      <section
        className="pull-box"
        ref={this.setPullBox}
        >
        <div
          className="pull-box-content"
          ref={this.setPullBoxContent}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          >
          <div
            className="pull-box-message"
            ref={this.setPullBoxMessage}
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

PullBox.propTypes = {
  children: PropTypes.node,
  onRelease: PropTypes.func,
};
