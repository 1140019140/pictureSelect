import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  useMemo, useRef, useEffect
} from 'react';
import isEqual from 'react-fast-compare';
// import { Toast } from 'components/Instance';
import { debounce, throttle } from './index';

const isObjectOrArray = t => t && typeof t === 'object';

export function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch));
    }
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
}

export function useShallowEqualSelector(selector, isDeep = false) {
  return useSelector(selector, isDeep ? isEqual : shallowEqual);
}

export function useDidUpdate(fn, deps) {
  const refTimes = useRef(0);
  useEffect(() => {
    if (refTimes.current++ > 0) {
      if (typeof fn === 'function') {
        fn(); 
      }
    }
  }, [fn]);
}

/**
 *
 * 防抖函数，包含是否初次执行
 * @export
 * @param {*} fn 防抖函数
 * @param {*} deps 参数
 * @param {number} [times=300] 阈值
 * @param {boolean} [immediately=true] 是否初始化立刻执行
 */
export function useDebounce(fn, deps, times = 300, immediately = true) {
  const lastThis = this;
  const { current: runner } = useRef(debounce(args => fn.apply(lastThis, args), times));
  const effect = immediately ? useEffect : useDidUpdate;
  effect(() => {
    runner(deps);
  }, deps);
}

export function useThrottle(fn, deps, times = 300, immediately = true) {
  const lastThis = this;
  const { current: runner } = useRef(throttle(args => fn.apply(lastThis, args), times));
  const effect = immediately ? useEffect : useDidUpdate;
  effect(() => {
    runner(deps);
  }, deps);
}

/**
 * 挂载时hooks
 * @param {*} fn
 */
export const useMount = (fn) => {
  useEffect(() => {
    fn();
  }, [fn]);
};
// export const useUnmount = (fn) => {
//   useEffect(() => fn(), [fn]);
// };

/**
 * 节流函数，等电梯，电梯15秒一轮，进人不重置。
 * @param {*} fn 被节流函数
 * @param {*} args 依赖更新参数
 * @param {number} [timing=300] 节流阀时间
 * @returns 节流值
 */
export const useThrottleFn = (fn, args, timing = 300) => {
  // const [state, setState] = useState(null);
  const timeout = useRef(null);
  const lastArgs = useRef(null); // 最近一次参数
  const hasChanged = useRef(false); // 是否有更新

  useEffect(() => {
    if (!timeout.current) {
      // setState(fn(...args));
      const timeoutHandler = () => {
        if (hasChanged.current) {
          // 有更新，立即更新并再启动一次，否则放弃更新
          hasChanged.current = false;
          // setState(fn(...lastArgs.current));
          fn(...lastArgs.current);
          timeout.current = setTimeout(timeoutHandler, timing);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutHandler, timing);
    } else {
      lastArgs.current = args; // 更新最新参数
      hasChanged.current = true; // 有更新任务
    }
    // useUnmount(() => {
    //   if (timeout.current !== undefined) {
    //     clearTimeout(timeout.current); 
    //   }
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);
  // return state;
};
export function usePrevious(val) {
  const pre = useRef();
  useEffect(() => {
    pre.current = val;
  });
  return pre.current;
}

/**
 * Hook版本 WhyDidYouUpdate
 *
 * @export
 * @param {*} name 打印名称
 * @param {*} props 比对props
 */
export function useWhyDidYouUpdate(name, props) {
  // 获取一个可变ref对象，我们可以在其中存储props ...
  // ... 以便下次运行此钩子时进行比较。
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // 从以前和当前props中获取所有关键点
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // 跟踪更改props
      const changesObj = {};
      // 遍历key
      allKeys.forEach((key) => {
        // 如果前一个与当前不同
        if (previousProps.current[key] !== props[key]) {
          // 添加到changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      // 如果changesobj不为空，则输出到控制台
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // 最后用当前的props更新先前的props以进行下一个hooks调用
    previousProps.current = props;
  });
}


export const useDeepEffect = (effect, deps) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      console.warn('`useDeepEffect` should not be used with no dependencies. Use React.useEffect instead.');
    }

    if (!deps.every(isObjectOrArray)) {
      console.warn(
        '`useDeepEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
      );
    }
  }
  const ref = useRef(undefined);
  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  useEffect(effect, ref.current);
};


export const useDeepMemo = (effect, deps) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      console.warn('`useDeepMemo` should not be used with no dependencies. Use React.useMemo instead.');
    }

    if (!deps.every(isObjectOrArray)) {
      console.warn(
        '`useDeepMemo` should not be used with dependencies that are all primitive values. Use React.useMemo instead.'
      );
    }
  }
  const ref = useRef(undefined);
  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  return useMemo(effect, ref.current);
};

export function useCurrentValue(value) {
  const ref = useRef(null);
  ref.current = value;
  return ref;
}
