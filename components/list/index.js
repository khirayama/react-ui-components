import React, {Component} from 'react';
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
  render() {
    return (
      <ul
        className="list"
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

// holdの判定はListItemのみで行う
export class ListItem extends Component {
  constructor() {
    super();

    this._timerId = null

    this.state = {
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
  _handleTouchStart() {
    const THRESHOLD_TIME = 750;

    this._timerId = setTimeout(() => {
      this.setState({holding: true});
      this.props.onHold();
    }, THRESHOLD_TIME);
  }
  _handleTouchMove() {
    clearTimeout(this._timerId);
    this.setState({holding: false});
  }
  _handleTouchEnd() {
    clearTimeout(this._timerId);
    this.setState({holding: false});
  }
  render() {
    return (
      <li
        className={classNames(
          "list-item",
          {"list-item__holding": this.state.holding}
        )}
        ref={(listItem) => this.listItem = listItem}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</li>
    );
  }
}

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
