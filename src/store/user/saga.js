import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

// ...

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield delay(1000);
  console.log('00000000');
  yield put({ type: 'setUserinfo' });
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  console.log(111111);
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}