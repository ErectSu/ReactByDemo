import getFetch from './getFetch.js';

let api = {
  login: '/login', // 登录
  getEnterprise: '/list-enterprise-by-phone', // 根据电话号码查商户
  getMenuList: '/login-user-menu', // 头部菜单
}
let api1 = {
  queryGroupList: {
    url: '/query-user-group-list', // 查询该企业下所有用户组
    method: 'post'
  },
}

api = getFetch(api, '/gic-auth-web');
api1 = getFetch(api1, '/member-config');

export default {
  ...api,
  ...api1
}