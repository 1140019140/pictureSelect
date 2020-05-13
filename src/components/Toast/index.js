//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**                                                                                     *
 * @description 全局Toast
 * @author lmc
 * @since 2019-10-21
 *                                                                                      */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import classnames from 'classnames';
import React from 'react';
import Notification from 'rmc-notification';
import Icon from '../Icon';
import './index.less';

const SHORT = 3;

const config = {
  duration: SHORT,
  mask: true
};

let messageInstance;
let messageNeedHide;
const prefixCls = 'h-toast';

function getMessageInstance(mask, callback) {
  (Notification).newInstance({
    prefixCls,
    style: {}, // clear rmc-notification default style
    transitionName: 'hi-fade',
    className: classnames({
      [`${prefixCls}-mask`]: mask,
      [`${prefixCls}-nomask`]: !mask
    })
  },
  notification => callback && callback(notification));
}

function notice(
  content,
  type,
  duration = config.duration,
  onClose,
  mask = config.mask
) {
  const iconTypes = {
    info: '',
    success: <Icon icon='success' />,
    fail: <Icon icon='fail' />,
    offline: <Icon icon='offline' />,
    loading: <div className='lds-dual-ring' />
  };
  const iconType = iconTypes[type];

  messageNeedHide = false;
  getMessageInstance(mask, (notification) => {
    if (!notification) {
      return;
    }

    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    if (messageNeedHide) {
      notification.destroy();
      messageNeedHide = false;
      return;
    }

    messageInstance = notification;

    notification.notice({
      duration,
      style: {},
      content: iconType ? (
        <div
          className={`${prefixCls}-text-with-icon ${prefixCls}-${type}`}
          role='alert'
          aria-live='assertive'
        >
          {iconType}
          <div className={`${prefixCls}-text-info`}>{content}</div>
        </div>
      ) : (
        <div className={`${prefixCls}-text`} role='alert' aria-live='assertive'>
          <div>{content}</div>
        </div>
      ),
      closable: true,
      onClose() {
        if (onClose) {
          onClose();
        }
        notification.destroy();
        // eslint-disable-next-line no-param-reassign
        notification = null;
        messageInstance = null;
      }
    });
  });
}

export default {
  SHORT,
  LONG: 8,
  show(content, duration, mask) {
    return notice(content, 'info', duration, () => {}, mask);
  },
  info(
    content,
    duration,
    onClose,
    mask
  ) {
    return notice(content, 'info', duration, onClose, mask);
  },
  success(
    content,
    duration,
    onClose,
    mask
  ) {
    return notice(content, 'success', duration, onClose, mask);
  },
  fail(
    content,
    duration,
    onClose,
    mask
  ) {
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline(
    content,
    duration,
    onClose,
    mask
  ) {
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading(
    content,
    duration,
    onClose,
    mask
  ) {
    return notice(content, 'loading', duration, onClose, mask);
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    } else {
      messageNeedHide = true;
    }
  },
  config(conf = {}) {
    const { duration = SHORT, mask } = conf;
    config.duration = duration;
    if (mask === false) {
      config.mask = false;
    }
  }
};
