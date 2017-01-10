import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TRANSITION_TIME = 1000;

export class List extends Component {
  componentDidMount() {
    document.querySelector('.list').addEventListener('contextmenu', event => {
      event.preventDefault();
    });
  }
  getChildContext() {
    return {
      listElement: () => this.listElement,
      onSort: this.props.onSort,
    };
  }
  render() {
    return (
      <section
        className="list-container"
        ref={(listElement) => this.listElement = listElement}
      >
        <ul className="list">
          <ReactCSSTransitionGroup
            transitionAppear={false}
            transitionName="list-item-transition"
            transitionEnterTimeout={TRANSITION_TIME}
            transitionLeaveTimeout={TRANSITION_TIME}
          >{this.props.children}</ReactCSSTransitionGroup>
        </ul>
      </section>
    );
  }
}

List.childContextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};