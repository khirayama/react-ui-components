import React, {Component, PropTypes} from 'react';
import {
  PullBox,
} from '../../components/pull-box';

export default class PullBoxContainer extends Component {
  constructor() {
    super();

    this.handleRelease = this._handleRelease.bind(this);
  }
  _handleRelease(close) {
    setTimeout(() => {
      close();
    }, 1000);
  }
  render() {
    return (
      <section className="pull-box-container">
        <PullBox
          onRelease={this.handleRelease}
          >
          <h1>Pull this</h1>
        </PullBox>
      </section>
    );
  }
}
