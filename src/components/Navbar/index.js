//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**                                                                                     *
 * @description 导航栏组件
 * @author lmc
 * @since 2019-10-14
 *                                                                                      */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


import classnames from 'classnames';
import { string, node, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { noop } from '../../utils/index';
import './index.less';

export default class NavBar extends PureComponent {
  static propTypes = {
    prefixCls: string,
    className: string,
    onLeftClick: func,
    onRightClick: func,
    mode: string,
    children: node,
    leftContent: node,
    rightContent: node
    // icon: node,
  }

  static defaultProps = {
    prefixCls: 'hi-navbar',
    mode: 'dark',
    className: '',
    leftContent: null,
    rightContent: null,
    // icon: null,
    onLeftClick: noop,
    onRightClick: noop,
    children: null
  };

  render() {
    const {
      prefixCls,
      className,
      children,
      mode,
      // icon,
      onLeftClick,
      onRightClick,
      leftContent,
      rightContent,
      ...restProps
    } = this.props;

    return (
      <div
        {...restProps}
        className={classnames(className, prefixCls, `${prefixCls}-${mode}`)}
      >
        <div
          className={`${prefixCls}-left`}
          role='button'
          onClick={onLeftClick}
         
        >
          {/* {icon ? (
          // tslint:disable-next-line:jsx-no-multiline-js
            <span className={`${prefixCls}-left-icon`} aria-hidden="true">
              {icon}
            </span>
          ) : null} */}
          {leftContent}
        </div>
        <div className={`${prefixCls}-title`}>{children}</div>
        <div className={`${prefixCls}-right`} onClick={onRightClick}>{rightContent}</div>
      </div>
    );
  }
}
