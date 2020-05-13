import Loadable from 'react-loadable';
import React from 'react';

function Loading() {
  return <div>loading...</div>;
}

const App = Loadable({
  loader: () => import('../views/App'),
  loading: Loading
  // () => import('../components/Load')
});
const Upload = Loadable({
  loader: () => import('../views/Upload'),
  loading: Loading
});
//...
//配置路由信息
const routes = [
  { path: '/app', name: 'app', component: App },
  { path: '/upload', name: 'upload', component: Upload }
];
export default routes;