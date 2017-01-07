import React, {Component} from 'react';

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

export class List extends Component {
  render() {
    return (
      <ul
        className="list"
        >{this.props.children}</ul>
    );
  }
}

export class ListItem extends Component {
  render() {
    return (
      <li
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
