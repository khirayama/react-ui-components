import React from 'react';
import ReactDOM from 'react-dom';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemLeftBackground,
  ListItemRightBackground,
} from './components/list';

window.addEventListener('DOMContentLoaded', () => {
  const listItemElements = [];
  for (let index = 0; index < 100; index++) {
    listItemElements.push((
      <ListItem key={index}>
        <ListItemLeftBackground>Left</ListItemLeftBackground>
        <ListItemContent>Content</ListItemContent>
        <ListItemRightBackground>Right</ListItemRightBackground>
      </ListItem>
    ));
  }
  ReactDOM.render((
    <section>
      <List>{listItemElements}</List>
    </section>
  ), document.querySelector('.application'));
});
