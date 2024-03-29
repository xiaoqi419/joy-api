import { AvatarDropdown, AvatarName, Footer, Question } from '@/components'
import { getLoginUserUsingGet as queryCurrentUser } from '@/services/joy-api/userController'
import { LinkOutlined } from '@ant-design/icons'
import type { Settings as LayoutSettings } from '@ant-design/pro-components'
import { SettingDrawer } from '@ant-design/pro-components'
import type { RunTimeLayoutConfig } from '@umijs/max'
import { Link, history } from '@umijs/max'
import { FloatButton } from 'antd'
import defaultSettings from '../config/defaultSettings'
import { errorConfig } from './requestErrorConfig'
const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.UserVO
  loading?: boolean
  fetchUserInfo?: () => Promise<API.UserVO | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true
      })
      return msg.data
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果不是登录页面，执行
  const { location } = history
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState
}) => {
  return {
    iconfontUrl: '//at.alicdn.com/t/c/font_4443840_xl2yiy0b5p.js',
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom
      }
      // 支持二级菜单显示icon
      return (
        <Link to={menuItemProps.path}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {menuItemProps.pro_layout_parentKeys &&
              menuItemProps.pro_layout_parentKeys.length > 0 &&
              menuItemProps.icon}
            <span>{defaultDom}</span>
          </div>
        </Link>
      )
    },

    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      }
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px'
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px'
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px'
      }
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>
        ]
      : [],

    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: children => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={settings => {
                setInitialState(preInitialState => ({
                  ...preInitialState,
                  settings
                }))
              }}
            />
          )}
          <FloatButton.BackTop
            icon={
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
              </svg>
            }
          />
        </>
      )
    },
    ...initialState?.settings
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig
}
