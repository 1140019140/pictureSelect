import Bridge from 'utils/bridge';
import dsBridge from 'dsbridge';
import history from '@/route/history';

/**
 * 判断iPhone|iPad|iPod|iOS|Android|PC
 * @export
 * @returns
 */
export function judgeClient() {
  let client = '';
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
    client = 'iOS';
  } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
    client = 'Android';
  } else {
    client = 'PC';
  }
  return client;
}


// 解析useragent
export function getUseragent() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Ealingmom_iOS') > -1) {
    return 'ios';
  } if (ua.indexOf('Ealingmom_android') > -1) {
    return 'android';
  }
  return 'webapp';
}

/* 给app端的封装信息 */
function toAppmessage(methodName, params, callback) {
  // console.log('methodName', methodName);
  // console.log('app-params', params);
  if (getUseragent() === 'ios') {
    Bridge.callhandler(methodName, params, callback);
  } else if (getUseragent() === 'android') {
    // const message = {
    //   action: methodName,
    //   ...params,
    // };
    // window.union.callBackClient(JSON.stringify(message));
    dsBridge.call(methodName, params, callback);
  }
}

/* 返回 */
export function triggerToBack() {
  // Bridge.registerhandler('triggerToBack', () => history.goBack());
  history.goBack();
}

/**
 *
 * 跳转外链
 * @export
 */
export function jumpToExternalLink(params) {
  toAppmessage('jumpToExternalLinkWithCallback', params);
}

/**
 *
 * 隐藏tabBar
 * @export
 * hide (1 隐藏) (0 显示)
 */
export function toggleTabBar(status) {
  toAppmessage('hideTabBar', `${JSON.stringify({ hide: status })}`);
}

/**
 *
 * 登出
 * @export
 */
export function togglelogout() {
  toAppmessage('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
}

/**
 *
 * web页面返回客户端页面
 * @export
 */
export function closePage() {
  toAppmessage('closeCurrentPage');
}

/**
 *
 * 获取客户端返回的用户信息
 */
export function getUserInfo(params, callBak) {
  toAppmessage('getLoginInfo', params, callBak);
}

/*  Q                                                                                                                                                                                                                                                                                                                                                                                           *
 * 上传图片
 * @type 0为默认值：0：相册 1：拍照
 * @limit 该次最多选择几张图。不传值，默认1张
 */
export function uploadImage(params, callBak) {
  toAppmessage('getImage', JSON.stringify(params), callBak);
}

/**
 * 跳转登陆
 */
export function jumpLanding(params, callBak) {
  toAppmessage('login', params, callBak);
}

/**
 *
 *
 * 获取手机版本
 */
export function getPhoneModel(params, callBak) {
  toAppmessage('getDeviceInfo', params, callBak);
}


/**
 *
 *
 * 刷新session
 */
export function getsessionExpire(params, callBak) {
  toAppmessage('sessionExpire', params, callBak);
}

/**
 *
 *
 * 客户端刷新信息
 */
export function modifyUserInfo(params, callBak) {
  toAppmessage('modifyUserInfo', params, callBak);
}

/**
 *
 *
 *支付方法
 */
export function triggerPayMoney(params, callBak) {
  toAppmessage('payMoney', JSON.stringify(params), callBak);
}


/**
 *
 *
 * reload
 */
export function webReload(params, callBak) {
  toAppmessage('webReload', params, callBak);
}
