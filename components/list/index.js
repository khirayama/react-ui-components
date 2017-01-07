import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

export class ListItem extends Component {
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
  render() {
    return (
      <li
        ref={(listItem) => this.listItem = listItem}
        className="list-item"
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
