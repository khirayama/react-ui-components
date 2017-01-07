import React from 'react';
import ReactDOM from 'react-dom';
import {List} from './list';

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<List/>, document.querySelector('.application'));
});
