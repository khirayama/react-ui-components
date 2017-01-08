import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

/*
 * List
 * ListItem
 * ListItemContent
 * ListItemLeftBackground
 * ListItemRightBackground
 */

// 仕様
// - hold eventを発火する
// - hold時のアニメーションができる
// - option: holdしたらsortできる
// - swipeLeft/swipeRightできる
// - swipe時にアニメーションができる
// - swipe完了時に戻る or 抜けるアニメーションができる

const TRANSITION_TIME = 1000;

export class List extends Component {
  componentDidMount() {
    const els = document.querySelectorAll('.list-item');

    for (let index = 0; index < els.length; index++) {
      const el = els[index];
      el.addEventListener('contextmenu', event => {
        event.preventDefault();
      });
    }
  }
  getChildContext() {
    return {
      listElement: () => this.listElement,
    };
  }
  render() {
    return (
      <ul
        className="list"
        ref={(listElement) => this.listElement = listElement}
        >
        <ReactCSSTransitionGroup
          transitionAppear={false}
          transitionName="list-item-transition"
          transitionEnterTimeout={TRANSITION_TIME}
          transitionLeaveTimeout={TRANSITION_TIME}
        >{this.props.children}</ReactCSSTransitionGroup>
      </ul>
    );
  }
}

List.childContextTypes = {
  listElement: PropTypes.func,
};

// holdの判定はListItemのみで行う
export class ListItem extends Component {
  constructor() {
    super();

    this._timerId = null

    this.state = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      holding: false,
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }
  componentDidMount() {
    const el = this.listItem;
    const rect = el.getBoundingClientRect();

    this.listItem.style.height = rect.height + 'px';
    setTimeout(() => {
      if (el.classList.contains('list-item-transition-enter')) {
        this.listItem.style.maxHeight = rect.height + 'px';
      }
    }, 0);
  }
  _handleTouchStart(event) {
    const THRESHOLD_TIME = 750;

    this.setState({
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    });

    this._timerId = setTimeout(() => {
      this.setState({holding: true});
      this.props.onHold();
    }, THRESHOLD_TIME);
  }
  _handleTouchMove(event) {
    const distance = Math.sqrt(Math.pow(event.touches[0].clientX - this.state.startX, 2) + Math.pow(event.touches[0].clientY - this.state.startY, 2));

    if (distance > 10) {
      if (this.state.holding) {
        event.preventDefault();
      }

      clearTimeout(this._timerId);

      this.setState({
        endX: event.touches[0].clientX,
        endY: event.touches[0].clientY,
        endTime: new Date(),
      });
    }
  }
  _handleTouchEnd(event) {
    event.preventDefault();
    clearTimeout(this._timerId);

    this.setState({
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      holding: false,
    });
  }
  _getDiff() {
    let x = this.state.endX - this.state.startX;
    let y = this.state.endY - this.state.startY;
    let time = this.state.endTime.getTime() - this.state.startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.state.endX === null || this.state.endY === null) {
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
    const style = {};
    const diff = this._getDiff();

    if (this.state.holding) {
      const listItemElements = this.context.listElement().querySelectorAll('.list-item');
      style.transition = 'none';
      style.transform = `translateY(${diff.y}px)`;

      let currentIndex = null;
      let targetIndex = null;

      const height = this.listItem.getBoundingClientRect().height;

      // get currentIndex and targetIndex
      for (let index = 0; index < listItemElements.length; index++) {
        const listItemElement = listItemElements[index];
        const targetRect = listItemElement.getBoundingClientRect();
        const top = this.state.endY;

        // if (listItemElement !== this.listItem && targetRect.top < top && top < targetRect.top + targetRect.height) {
        if (targetRect.top < top && top < targetRect.top + targetRect.height) {
          if (this.state.startY < targetRect.top) {
            if (!listItemElement.classList.contains('moving')) {
              if (listItemElement.style.transform === `translateY(-${height}px)`) {
                listItemElement.style.transform = `translateY(0px)`;
                listItemElement.classList.add('moving');
                setTimeout(() => {
                  listItemElement.classList.remove('moving')
                }, 200);
              } else {
                listItemElement.style.transform = `translateY(-${height}px)`;
                listItemElement.classList.add('moving');
                setTimeout(() => {
                  listItemElement.classList.remove('moving')
                }, 200);
              }
            }
          } else if (targetRect.top + targetRect.height < this.state.startY) {
            if (!listItemElement.classList.contains('moving')) {
              if (listItemElement.style.transform === `translateY(${height}px)`) {
                listItemElement.style.transform = `translateY(0px)`;
                listItemElement.classList.add('moving');
                setTimeout(() => {
                  listItemElement.classList.remove('moving')
                }, 200);
              } else {
                listItemElement.style.transform = `translateY(${height}px)`;
                listItemElement.classList.add('moving');
                setTimeout(() => {
                  listItemElement.classList.remove('moving')
                }, 200);
              }
            }
          } else {
            if (!listItemElement.classList.contains('moving')) {
              listItemElement.style.transform = `translateY(0px)`;
              listItemElement.classList.add('moving');
              setTimeout(() => {
                listItemElement.classList.remove('moving')
              }, 200);
            }
          }
        }
      }
    } else {
      if (this.context.listElement()) {
        const listItemElements = this.context.listElement().querySelectorAll('.list-item');
        for (let index = 0; index < listItemElements.length; index++) {
          listItemElements[index].style.transition = 'none';
          listItemElements[index].style.transform = `translateY(0px)`;
          setTimeout(() => {
            if (this.listItem !== listItemElements[index]) {
              listItemElements[index].style.transition = '200ms ease-out';
            }
          });
        }
      }
    }

    return (
      <li
        className={classNames(
          "list-item",
          {"list-item__holding": this.state.holding}
        )}
        style={style}
        ref={(listItem) => this.listItem = listItem}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</li>
    );
  }
}

ListItem.contextTypes = {
  listElement: PropTypes.func,
};

export class ListItemContent extends Component {
  render() {
    return (
      <div
        className="list-item-content"
        >{this.props.children}</div>
    );
  }
}

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
