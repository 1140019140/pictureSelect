/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
const { toString } = Object.prototype;

/**
 * 没有副作用的空函数
 * @export void
 */
export function noop() {}

/**
 * 防抖函数，电梯15秒走一趟，来人重置15s
 * @export randomClass
 * @returns String
 */
export function debounce(func, times) {
  let lastCallTime;
  let lastArgs;
  let lastThis;
  let timerId;

  function startTimer(timerExpiredFunc, waiting) {
    return setTimeout(timerExpiredFunc, waiting);
  }
  function invokeFunc() {
    const args = lastArgs;
    const currentThis = lastThis;
    const result = func.apply(currentThis, args);
    // eslint-disable-next-line no-multi-assign
    lastArgs = lastThis = timerId = undefined;
    return result;
  }
  function shouldInvoke(time) {
    return lastCallTime !== undefined && (time - lastCallTime >= times);
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = times - timeSinceLastCall;
    return timeWaiting;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return invokeFunc();
    }
    timerId = startTimer(timerExpired, times);
  }
  function debounced(...args) {
    const time = Date.now();
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, remainingWait(time));
    }
  }
  return debounced;
}

/**
 * 节流函数，电梯15秒走一趟，来人不重置
 * @export
 * @param {*} func 节流函数
 * @param {*} waitTime 间隔时间
 * @param {*} [options={}] leading开始边界执行 trailing结束边界执行
 * @returns
 */
export function throttle(func, waitTime, options = { leading: true, trailing: true }) {
  let context; // 上下文对象
  let arg; // 参数
  let timeoutId; // 定时器Id
  let previous = 0; // 上次执行时间戳

  function throttled(...args) {
    arg = args;
    context = this;
    const now = +new Date();

    // 当 previous 为0 并且开始边界为false 代表不需要立即执行
    if (!previous && options.leading === false) {
      previous = now; 
    }

    const overdue = now - previous; // 距离上次执行时间

    const remain = waitTime - overdue; // 还需要等待多久才能进行下一次执行

    function invoke() {
      func.apply(context, arg);
      timeoutId = null;
      if (!timeoutId) {
        // 如果当前没有定时器，清空参数防止影响下一次
        arg = null;
        context = null;
      }
    }

    if (remain <= 0 || overdue < 0) {
      // remain<=0为可执行 overdue小于0为修改了系统时间
      if (timeoutId) {
        // 如果有结束边界的情况，需要清空下，比如1s的waiting  1.2s结束操作触发了结束边界  1.8s的时候又触发了
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      // 执行
      previous = now;
      invoke();
    } else if (!timeoutId && options.trailing !== false) {
      // 还没到可执行时间，预设定结束边界
      timeoutId = setTimeout(() => {
        // 如果直接设置 previous = + new Date(); 则当 leading 为 false 的时候，
        // 就不会执行 if(!previous && options.leading === false)  previous = now  而无法禁用上一次
        invoke();
        previous = options.leading === false ? 0 : +new Date();
      }, remain);
    }
  }
  throttled.cancel = function cancel() {
    clearTimeout(timeoutId);
    timeoutId = null;
    previous = 0;
  };

  return throttled;
}


/**
 * 产生一个随机的key d.d.3.a.3.f
 * @export randomClass
 * @returns String
 */
export function generatorUniqueKey() {
  return Math.random().toString(36).substr(0, 7).split('')
    .join('.');
}

/**
 * 产生一个随机的字符串 dasdasfasd
 * @export randomClass
 * @returns String
 */
export function randomClass() {
  return Math.random().toString(36).substr(2);
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * 检查是否是纯原生对象，失败 Object.create(null) 或者dom对象
 * @param item
 * @returns {boolean}
 */
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false; 
  }
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

/**
 * 检查是否是函数
 * @param item
 * @returns {boolean}
 */
export function isFunction(obj) {
  return typeof obj === 'function' && typeof obj.call === 'function';
}


const isArrayAndObject = value => typeof value === 'object' && value !== null;
export function filter(array, key, value) {
  function findIteator(object) {
    if (!isArrayAndObject(object)) {
      return false; 
    }
    if (hasOwnProperty.call(object, key) && object[key] === value) {
      return true;
    }
    return Object.values(object).some(findIteator);
  }
  return array.find(findIteator);
}

export function scan(id, transform, notCb, searchKey = 'id') {
  return function jude(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (isArrayAndObject(value) && value[searchKey] === id) {
        return transform(value);
      }
      if (notCb && hasOwnProperty.call(obj, key)) {
        notCb(obj);
      }
      return value;
    }));
  };
}

/**
 * 检测原始类型的数据
 * @param item
 * @returns {boolean}
 */
export const isOriginal = o => (typeof o === 'object' ? !o : typeof o !== 'function');

/**
 * 深度合并多个对象。
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target; 
  }
  const source = sources.shift();
  const hasOwnPerproty = Object.prototype.hasOwnProperty;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (hasOwnPerproty.call(source, key)) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} }); 
          }
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    });
  }

  return mergeDeep(target, ...sources);
}

/**
 * 极简科里化函数
 * @param {*} fn
 * @returns result or iterator
 */
export const simpleCurry = (fn) => {
  const judge = (...args) => (
    args.length >= fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg));
  return judge;
};
export const simpleCurry_ = (fn, ...args) => (
  args.length >= fn.length ? fn(...args) : simpleCurry.bind(null, fn, ...args)
);

/**
 * 科里化函数
 * const fn = curry(function(a,b,c){},?3)
 * fn(1)(2)(3)
 * @param {*} fn
 * @param {*} length
 * @returns
 */
const subCurry = (fn, ...args) => (...args2) => fn.apply(this, [...args, ...args2]);
export const curry = (fn, length) => {
  if (typeof fn !== 'function') {
    throw new Error(`curry argument must be a function, but actually is a ${toString(fn)}`);
  }
  // 获取所需参数
  const argsLength = length || fn.length;

  return (...args) => {
    // 如果参数不够
    if (args.length < argsLength) {
      // 重新收集参数
      const combined = [fn].concat([].slice.apply(args));

      // 拿到 (...args2) => fn.apply(this, [...args, ...args2]);
      const newSubCurry = subCurry.apply(this, combined);
      // 剩余参数长度
      const surplusArgs = argsLength - args.length;

      // 再调用一次
      return curry(newSubCurry, surplusArgs);
    }
    return fn.apply(this, args);
  };
};

/**
 * 改进版splice 比原生快50%
 *
 * @param {*} list 列表
 * @param {*} index 删除下标
 */
export function spliceOne(list, index) {
  for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  list.pop();
}

/**
 * 阻塞函数，配合async使用
 * @export
 * @param {number} [time=0] 阻塞时间
 * @returns void
 */
export function wait(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * 解析url转化JSON
 * @export getJsonFromUrl
 * @param {*} hashBased
 * @returns JSON
 */
export function getJsonFromUrl(hashBased) {
  let query;
  if (hashBased) {
    const pos = window.location.href.indexOf('?');
    if (pos === -1) {
      return []; 
    }
    query = window.location.href.substr(pos + 1);
  } else {
    query = window.location.search.substr(1);
  }
  const result = {};
  query.split('&').forEach((part) => {
    if (!part) {
      return; 
    }
    part = part.split('+').join(' '); // replace every + with space, regexp-free version
    const eq = part.indexOf('=');
    let key = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    const from = key.indexOf('[');
    if (from === -1) {
      result[decodeURIComponent(key)] = val; 
    } else {
      const to = key.indexOf(']', from);
      const index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) {
        result[key] = []; 
      }
      if (!index) {
        result[key].push(val); 
      } else {
        result[key][index] = val; 
      }
    }
  });
  return result;
}


/**
 * mock请求函数
 * @param {number} [time=2000]
 */
export const request = (time = 2000) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

/**
 *
 * 适用场景：购物车满减优惠券
 * getCombBySum([1, 2, 3, 4, 5], 6, null, 2);
 * @export
 * @param {*} array 数据源数组，必选；
 * @param {*} sum 相加的和，必选；
 * @param {*} tolerance 容差，如果不指定此参数，则相加的和必须等于sum参数，指定此参数可以使结果在容差范围内浮动，可选；
 * @param {*} targetCount 操作数数量，如果不指定此参数，则结果包含所有可能的情况，指定此参数可以筛选出固定数量的数相加，假如指定为3，那么结果只包含三个数相加的情况，可选；
 * @returns 返回的是数组套数组结构，内层数组中的元素是操作数，外层数组中的元素是所有可能的结果；
 */
export function getCombBySum(array, sum, tolerance, targetCount) {
  const r = [];
  let _array = [];
  let _targetCount = 0;
  let _tolerance = 0;
  let _returnMark = 0;
  // check data
  _targetCount = targetCount || _targetCount;
  _tolerance = tolerance || _tolerance;
  const util = {

    /*
            get combination from array
            arr: target array
            num: combination item length
            return: one array that contain combination arrays
          */
    /* 获取所有的可能组合
          如果是[1,2,3,4,5]取出3个，那么可能性就有10种 C(5,3)= C(5,2)
          公式：
          全排列  P(n,m)=n!/(n-m)!
          组合排列 P(n,m)=n!/m!/(n-m)!
          C(5,2)=5!/2!*3!=5*4*3*2*1/[(2*1)*(3*2*1)]=10
          这是使用了循环加递归做出了组合排序
          */
    getCombination(arr, num) { //  索引数组 操作数数量
      const r = [];
      (function f(t, a, n) {
        if (n == 0) {
          return r.push(t); 
        }
        for (let i = 0, l = a.length; i <= l - n; i++) {
          f(t.concat(a[i]), a.slice(i + 1), n - 1);
        }
      }([], arr, num));
      return r;
    },
    // 获取数组的索引
    getArrayIndex(array) {
      let i = 0;
      const r = [];
      for (i = 0; i < array.length; i++) {
        r.push(i);
      }

      return r;
    }
  };
  const logic = {
    //  对数组进行排序
    //  获取数组中比sum小的数
    init(array, sum) { // 初始化去除不可能的元素
      // clone array
      const _array = array.concat();
      const r = [];
      let i = 0;
      // sort by asc
      _array.sort((a, b) => a - b);
      // 当它小于或等于总和时获得所有数字
      for (i = 0; i < _array.length; i++) {
        if (_array[i] <= sum) {
          r.push(_array[i]);
        } else {
          break;
        }
      }
      console.log('初始化后的数据源:', r);
      return r;
    },
    // important function
    core(array, sum, arrayIndex, count, r) {
      let i = 0;
      let k = 0;
      let combArray = [];
      let _sum = 0;
      let _cca = [];
      let _cache = [];
      if (count == _returnMark) {
        return;
      }
      // 获取当前的计数总和
      // 这里排序的不是原来的数组,而是求的索引后的数组
      combArray = util.getCombination(arrayIndex, count);
      console.log('getCombination返回的值：', combArray);
      for (i = 0; i < combArray.length; i++) {
        _cca = combArray[i];
        _sum = 0;
        _cache = [];
        // calculate the sum from combination
        for (k = 0; k < _cca.length; k++) {
          _sum += array[_cca[k]];
          _cache.push(array[_cca[k]]);
        }
        if (Math.abs(_sum - sum) <= _tolerance) {
          r.push(_cache);
        }
      }

      logic.core(array, sum, arrayIndex, count - 1, r);
    }
  };
  _array = logic.init(array, sum);
  if (_targetCount) {
    _returnMark = _targetCount - 1;
  }
  console.log('_targetCount的值:', _targetCount);
  console.log('_returnMark的值:', _returnMark);
  logic.core(_array, sum, util.getArrayIndex(_array), (_targetCount || _array.length), r);
  return r;
}