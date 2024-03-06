export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ]
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'icon-shenhe',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface-list' },
      {
        path: '/admin/interface-list',
        name: '接口管理列表',
        component: './Admin/InterfaceList'
      },
      {
        path: '/admin/approved-list',
        name: '接口审核列表',
        component: './Admin/ApprovedInterfaceList'
      }
    ]
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' }
]