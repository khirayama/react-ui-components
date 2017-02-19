import React, {Component, PropTypes} from 'react';
import {
  Tab,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
} from '../../components/tab';
import {
  TableList,
  TableListItem,
  TableListItemContent,
  TableListItemLeftBackground,
  TableListItemRightBackground,
} from '../../components/table-list';

export default class TabContainer extends Component {
  constructor() {
    super();

    const labels = [{
      id: '' + 0,
      name: 'Label1',
    }, {
      id: '' + 1,
      name: 'Label2',
    }];

    const items = [];
    for (let index = 0; index < 30; index++) {
      items.push({
        id: index + '-' + (new Date()).getTime(),
        labelId: '' + index % 2,
        name: `Item ${index}`,
      });
    }

    this.state = {
      labels,
      items,
    };

    this.handleSort = this._handleSort.bind(this);
    this.handleTouchHold = this._handleTouchHold.bind(this);
    this.handleSwipeLeft = this._handleSwipeLeft.bind(this);
    this.handleSwipeRight = this._handleSwipeRight.bind(this);
  }
  _handleTouchHold() {
    console.log('touch hold!');
  }
  _handleSwipeLeft(itemId) {
    const items = this.state.items.filter((item) => {
      if (item.id !== itemId) {
        return true;
      }
    });

    this.setState({items});
  }
  _handleSwipeRight(index) {
    console.log('swipe right');
  }
  _handleSort(from, to, labelId) {
    const items = this.state.items.filter((item) => {
      if (item.labelId === labelId) {
        return item;
      }
    });
    const item = items.splice(from, 1)[0];
    items.splice(to, 0, item);

    this.setState({items});
  }
  render() {
    const labelTabElements = [];
    const labelTabContentElements = [];

    this.state.labels.forEach((label, index) => {
      const items = this.state.items.filter((item) => {
        if (item.labelId === label.id) {
          return item;
        }
      });

      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      const listItemElements = items.map((item) => {
        return (
          <TableListItem
            key={item.id}
            onTouchHold={this.handleTouchHold}
            onSwipeLeft={() => this.handleSwipeLeft(item.id)}
            onSwipeRight={this.handleSwipeRight}
            througnRight={false}
            >
            <TableListItemLeftBackground>
              <div>L</div>
            </TableListItemLeftBackground>
            <TableListItemContent>{item.name}</TableListItemContent>
            <TableListItemRightBackground>
              <div>R</div>
            </TableListItemRightBackground>
          </TableListItem>
        );
      });

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <TableList
            onSort={(from, to) => this.handleSort(from, to, label.id)}
            >{listItemElements}</TableList>
        </TabContentListItem>
      );
    });
    return (
      <Tab>
        <TabList>{labelTabElements}</TabList>
        <TabContentList>{labelTabContentElements}</TabContentList>
      </Tab>
    );
  }
}
