import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function getHeaderPhoto(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

// export function logout() {

// }
export function getBuMen() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
export function delBumen(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
export function addBumen(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
export function getMan() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
export function editBumen(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
export function editBumends(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
export function getUser() {
  return request({
    url: '/sys/role',
    method: 'GET'
  })
}
