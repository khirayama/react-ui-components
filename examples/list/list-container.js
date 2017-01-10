import React, {Component} from 'react';

import {
  List,
  ListItem,
  ListItemContent,
  ListItemLeftBackground,
  ListItemRightBackground,
} from '../../components/list';

export default class ListContainer extends Component {
  constructor(props) {
    super(props);

    const items = [];
    for (let index = 0; index < 5; index++) {
      items.push({
        id: index,
        name: `Item ${index}`,
      });
    }
    this.state = {
      items,
    };

    this.handleClickAddButton = this._handleClickAddButton.bind(this);
    this.handleClickRemoveButton = this._handleClickRemoveButton.bind(this);
    this.handleSort = this._handleSort.bind(this);
    this.handleTouchHold = this._handleTouchHold.bind(this);
    this.handleSwipeLeft = this._handleSwipeLeft.bind(this);
    this.handleSwipeRight = this._handleSwipeRight.bind(this);
  }
  _handleClickAddButton() {
    const index = this.state.items.length;
    const items = this.state.items.concat();
    items.push({
      id: index,
      name: `Item ${index}`,
    });

    this.setState({items});
  }
  _handleClickRemoveButton() {
    const index = this.state.items.length;
    const items = this.state.items.filter((item, index_) => {
      if (index_ !== index - 1) {
        return true;
      }
    });

    this.setState({items});
  }
  _handleTouchHold() {
    console.log('touch hold!');
  }
  _handleSwipeLeft(index) {
    const items = this.state.items.filter((item, index_) => {
      if (index_ !== index) {
        return true;
      }
    });
    console.log(index, items);

    this.setState({items});
  }
  _handleSwipeRight(index) {
    console.log('swipe right');
  }
  _handleSort(from, to) {
    const items = this.state.items;
    const item = items.splice(from, 1);
    items.splice(to, 0, item[0]);

    this.setState({items});
  }
  render() {
    const listItemElements = this.state.items.map((item) => {
      return (
        <ListItem
          key={item.id}
          onTouchHold={this.handleTouchHold}
          onSwipeLeft={this.handleSwipeLeft}
          onSwipeRight={this.handleSwipeRight}
          >
          <ListItemLeftBackground>Left</ListItemLeftBackground>
          <ListItemContent>{item.name}</ListItemContent>
          <ListItemRightBackground>Right</ListItemRightBackground>
        </ListItem>
      );
    });

    return (
      <section>
        <div onClick={this.handleClickAddButton}>add item</div>
        <div onClick={this.handleClickRemoveButton}>remove item</div>
        <List
          onSort={this.handleSort}
          >{listItemElements}</List>
      </section>
    );
  }
}
