import request from '@/utils/request'
export function getlist() {
  return request({
    url: '/huanbao/vehicle/list',
    method: 'get'
  })
}

export function updata(data) {
  return request({
    url: '/huanbao/task/processed?taskId='+data,
    method: 'put',
    data:data
  })
}
