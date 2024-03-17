export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ]
  },
  {
    path: '/interface-info/:id',
    name: '接口详情',
    component: './InterfaceInfo',
    hideInMenu: true
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'SmileTwoTone',
    component: './Welcome'
  },
  {
    path: '/interface-list',
    name: '接口列表',
    icon: 'icon-meirituijian',
    routes: [
      {
        path: '/interface-list',
        redirect: '/interface-list/public'
      },
      {
        path: '/interface-list/public',
        name: '公共接口',
        icon: 'ContactsTwoTone',
        component: './List/PublicInterfaceList'
      }
    ]
  },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'HeartTwoTone',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface-list' },
      {
        path: '/admin/interface-list',
        name: '接口管理',
        icon: 'SnippetsTwoTone',
        component: './Admin/InterfaceList'
      },
      {
        path: '/admin/approved-list',
        icon: 'HighlightTwoTone',
        name: '接口审核',
        component: './Admin/ApprovedInterfaceList'
      },
      {
        path: '/admin/notice-manage',
        icon: 'EditTwoTone',
        name: '公告管理',
        component: './Admin/NoticeManage'
      }
    ]
  },
  {
    path: '/personal-setting',
    name: '个人设置',
    icon: 'SettingTwoTone',
    component: './Setting/PersonalSettings'
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' }
]
