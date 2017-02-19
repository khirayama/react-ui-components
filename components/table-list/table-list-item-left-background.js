import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class TableListItemLeftBackground extends Component {
  render() {
    return (
      <div
        className={
          classNames(
            this.props.className,
            'table-list-item-background',
            'table-list-item-left-background'
          )
        }
        >{this.props.children}</div>
    );
  }
}

TableListItemLeftBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
