import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

/**
 *
 *
 * @class IconComponent iconfont组件显示
 * @extends {Component}
 * 
 */
class IconComponent extends Component {
  render() {
    const { iconName, className, onClick, style } = this.props;
    return (
      <svg className={`${styles.iconClass} ${className}`} aria-hidden='true' style={style} onClick={onClick}>
        <use xlinkHref={`#${iconName}`}></use>
      </svg>
    );
  }
}

IconComponent.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string
};

export default IconComponent;