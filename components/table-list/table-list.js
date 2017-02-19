import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import {TRANSITION_TIME} from '../constants';

export class TableList extends Component {
  constructor() {
    super();

    this.setTableListElement = this._setTableListElement.bind(this);
  }
  componentDidMount() {
    this.listElement.querySelector('.table-list-content').addEventListener('contextmenu', event => {
      event.preventDefault();
    });
  }
  getChildContext() {
    return {
      listElement: () => this.listElement,
      onSort: this.props.onSort,
    };
  }
  _setTableListElement(listElement) {
    this.listElement = listElement;
  }
  render() {
    return (
      <section
        className={classNames('table-list', this.props.className)}
        ref={this.setTableListElement}
        >
        <div className="table-list-content">
          <ReactCSSTransitionGroup
            transitionAppear={false}
            transitionName="table-list-item-transition"
            transitionEnterTimeout={TRANSITION_TIME}
            transitionLeaveTimeout={TRANSITION_TIME}
            >{this.props.children}</ReactCSSTransitionGroup>
        </div>
      </section>
    );
  }
}

TableList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSort: PropTypes.func,
};

TableList.childContextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};
