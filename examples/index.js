import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// list
import ListContainer from './list/list-container';

// tab
import TabContainer from './tab/tab-container';

// pull-box
import PullBoxContainer from './pull-box/pull-box-container';

// tab and list
import TabListContainer from './tab-and-list/tab-list-container';

window.addEventListener('DOMContentLoaded', () => {
  // list
  if (document.querySelector('.list-component')) {
    ReactDOM.render(<ListContainer/>, document.querySelector('.list-component'));
  }

  // tab
  if (document.querySelector('.tab-component')) {
    ReactDOM.render(<TabContainer/>, document.querySelector('.tab-component'));
  }

  // pull-box
  if (document.querySelector('.pull-box-component')) {
    ReactDOM.render(<PullBoxContainer/>, document.querySelector('.pull-box-component'));
  }

  // tab and list
  if (document.querySelector('.tab-and-list')) {
    ReactDOM.render(<TabListContainer/>, document.querySelector('.tab-and-list'));
  }
});
