import request from 'utils/request';

export function login(data) { 
  return request({
    url: '/rest/mms/login',
    method: 'post',
    params: data
  });
}
