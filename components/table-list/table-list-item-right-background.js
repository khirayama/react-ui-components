import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class TableListItemRightBackground extends Component {
  render() {
    return (
      <div
        className={
          classNames(
            this.props.className,
            'table-list-item-background',
            'table-list-item-right-background'
          )
        }
        >{this.props.children}</div>
    );
  }
}

TableListItemRightBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
