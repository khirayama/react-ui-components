import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// list
import ListContainer from './list/list-container';

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.list-component')) {
    ReactDOM.render(<ListContainer/>, document.querySelector('.list-component'));
  }
});
