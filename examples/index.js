import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// table list
import TableListContainer from './table-list/table-list-container';

// tab
import TabContainer from './tab/tab-container';

// tab and table list
import TabTableListContainer from './tab-and-table-list/tab-table-list-container';

window.addEventListener('DOMContentLoaded', () => {
  // table list
  if (document.querySelector('.table-list-component')) {
    ReactDOM.render(<TableListContainer/>, document.querySelector('.table-list-component'));
  }

  // tab
  if (document.querySelector('.tab-component')) {
    ReactDOM.render(<TabContainer/>, document.querySelector('.tab-component'));
  }

  // tab and list
  if (document.querySelector('.tab-and-table-list')) {
    ReactDOM.render(<TabTableListContainer/>, document.querySelector('.tab-and-table-list'));
  }
});
