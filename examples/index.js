import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// list
import ListContainer from './list/list-container';

// tab
import TabContainer from './tab/tab-container';

window.addEventListener('DOMContentLoaded', () => {
  // list
  if (document.querySelector('.list-component')) {
    ReactDOM.render(<ListContainer/>, document.querySelector('.list-component'));
  }

  // tab
  if (document.querySelector('.tab-component')) {
    ReactDOM.render(<TabContainer/>, document.querySelector('.tab-component'));
  }
});
