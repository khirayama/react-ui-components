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
    for (let index = 0; index < 15; index++) {
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
    const items = this.state.items.filter((item) => {
      if (item.id !== index - 1) {
        return true;
      }
    });

    this.setState({items});
  }
  render() {
    const listItemElements = this.state.items.map((item) => {
      return (
        <ListItem
          key={item.id}
          onHold={() => console.log('hold')}
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
          onSort={() => console.log('sort')}
          >{listItemElements}</List>
      </section>
    );
  }
}
