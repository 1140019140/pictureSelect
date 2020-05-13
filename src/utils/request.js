import axios from 'axios';
import { Toast } from 'antd-mobile';
// import history from '@/utils/history';
// import { tokenExpireWithCallback } from 'utils/client';

// 创建axios实例
axios.defaults.withCredentials = true;

let env = process.env.NODE_ENV;
let baseUrl = '';
if (env === 'development') {
  baseUrl = 'https://api.cnjiang.com/mallh5';
} else if (env === 'production') {
  baseUrl = 'https://api.cnjiang.com/mallh5';
}
const service = axios.create({
  baseURL: baseUrl,
  headers: {
    device: "h5"
  },
  timeout: 15000
});
// request拦截器
service.interceptors.request.use(config => {
  if (window.localStorage.getItem('token')) {
    config.headers['token'] = window.localStorage.getItem('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.code * 1 !== 200) {
      if (res.code * 1 !== 2000) {
        Toast.fail(res.message);
      }
      if (res.code * 1 === 1009) {
        Toast.fail(res.message);
        setTimeout(() => {
          window.location.pathname = '/big-money-mobile-admin/login';
        }, 1000);
      }
      return Promise.reject(res && res.message);
    } else if (res.code === undefined) {
      Toast.fail(res.resultMessage);
    } else {
      return response.data;
    }
    // if (res.code * 1 === 1009) {
    //   history.push('/login');
    // }
  },
  error => {
    if (error.response.status === 500) {
      if (error.response.data.status === 4023) {
        console.log(this);
        // 4024指的是token有误 直接跳转到登录界面
        window.localStorage.removeItem('token');
      }
      Toast.fail(error.message);
      return Promise.reject(error);
    } else {
      Toast.fail(error.message);
      return Promise.reject(error);
    }
  }
);

export default service;
