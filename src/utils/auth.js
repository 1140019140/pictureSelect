const TokenKey = 'token';
const UidKey = 'uid';
const shopIdKey = 'shopId';

export function getToken() {
  return window.localStorage.getItem(TokenKey);
}

export function setToken(token) {
  window.localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  if (window.localStorage.removeItem(TokenKey)) {
    return window.localStorage.removeItem(TokenKey) === 'undefined' ? null : window.localStorage.removeItem(TokenKey);
  } else {
    return null;
  }
}


export function setUid(uid) {
  return window.localStorage.setItem(UidKey, uid);
}
export function getUid() {
  if (window.localStorage.getItem(UidKey)) {
    return window.localStorage.getItem(UidKey) === 'undefined' ? null : window.localStorage.getItem(UidKey);
  } else {
    return null;
  }
}

export function removeUid() {
  return window.localStorage.removeItem(UidKey);
}

export function setShopId(shopId) {
  return window.localStorage.setItem(shopIdKey, shopId);
}

export function getShopId() {
  return window.localStorage.getItem(shopIdKey);
}

// export async function getSessionId() {
//   await getUserInfoByToken({
//     token: window.localStorage.getItem(TokenKey),
//   }).then((res) => {
//     if (res && res.code === 200) {
//       window.localStorage.setItem(UidKey, res.data.userId);
//       window.localStorage.setItem(TokenKey, res.data.token);
//     }
//   });
// }


// 笛卡尔积算法
export function calcDescartes(array) {
  if (array.length < 2) {
    return array[0] || [];
  }
  return [].reduce.call(array, function (col, set) {
    var res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}
export function removeShopId() {
  if (window.localStorage.removeItem(shopIdKey)) {
    return window.localStorage.removeItem(shopIdKey) === 'undefined' ? null : window.localStorage.removeItem(shopIdKey);
  } else {
    return null;
  }
}
