import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {
  Tab,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
} from '../../components/tab';

class TabContainer extends Component {
  render() {
    const labels = [{
      name: 'Label1',
    }, {
      name: 'Label2',
    }];

    const labelTabElements = [];
    const labelTabContentElements = [];

    labels.forEach((label, index) => {
      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <h1>{label.name}</h1>
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

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<TabContainer/>, document.querySelector('.tab-component'));
});
