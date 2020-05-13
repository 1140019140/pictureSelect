
import request from 'utils/request';

export function dashboard(data) { 
  return request({
    url: '/rest/mms/index/dashboard',
    method: 'post',
    params: data
  });
}
