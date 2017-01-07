import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// list
import ListContainer from './list/list-container';

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<ListContainer/>, document.querySelector('.list-component'));
});
