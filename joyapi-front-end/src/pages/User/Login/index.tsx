import ForgetModal from '@/components/Forget/index'
import { userLoginUsingPost } from '@/services/joy-admin/userController'
import {
  AlipayOutlined,
  LockOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined
} from '@ant-design/icons'
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components'
import { history, useModel } from '@umijs/max'
import { Button, Divider, Space, Tabs, message, theme } from 'antd'
import Link from 'antd/es/typography/Link'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer'
}

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const { token } = theme.useToken()
  const { initialState, setInitialState } = useModel('@@initialState')

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState(s => ({
          ...s,
          currentUser: userInfo
        }))
      })
    }
  }

  const doLogin = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const msg = await userLoginUsingPost({ ...values })
      if (msg.code === 200) {
        message.success('登录成功！')
        await fetchUserInfo()
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/')
        return
      } else {
        message.error(msg.message)
      }
    } catch (error) {
      console.log(error)
      message.error('登录失败，请重试！')
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh'
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://upload.ojason.top/hexo/bg.jpg"
        logo="https://upload.ojason.top/hexo/logo.png"
        title="Joy Api Pro"
        containerStyle={{
          backdropFilter: 'blur(4px)'
        }}
        subTitle={
          <Link href="https://www.ojason.top/" target="_blank">
            定义公益API全新标准
          </Link>
        }
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: 'rgba(255,255,255,0.85)',
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)'
          },
          title: '欢迎使用Joy Api Pro后台管理系统',
          subTitle: '如果觉得不错的话，前往我的博客查看更多内容吧！',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120
              }}
              onClick={() => {
                window.open('https://www.ojason.top')
              }}
            >
              去看看
            </Button>
          )
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14
                }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%'
                }}
              >
                <AlipayOutlined
                  onClick={() => message.success('正在开发中哦~')}
                  style={{ ...iconStyles, color: '#1677FF' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%'
                }}
              >
                <TaobaoOutlined
                  onClick={() => message.success('正在开发中哦~')}
                  style={{ ...iconStyles, color: '#FF6A10' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%'
                }}
              >
                <WeiboOutlined
                  onClick={() => message.success('正在开发中哦~')}
                  style={{ ...iconStyles, color: '#1890ff' }}
                />
              </div>
            </Space>
          </div>
        }
        onFinish={async values => {
          await doLogin(values as API.UserLoginRequest)
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              placeholder={'用户名: '}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              placeholder={'密码: '}
              rules={[
                {
                  required: true,
                  message: '请输入密码！'
                },
                {
                  min: 8,
                  type: 'string',
                  message: '密码不能小于8位！'
                }
              ]}
            />
          </>
        )}
        {/* {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！'
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！'
                }
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              captchaProps={{
                size: 'large'
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！'
                }
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234')
              }}
            />
          </>
        )} */}
        <div
          style={{
            marginBlockEnd: 24
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right'
            }}
            onClick={() => history.push('/user/register')}
          >
            没有账号？
          </a>
          {/* 忘记密码弹窗 */}
          <ForgetModal />
        </div>
      </LoginFormPage>
    </div>
  )
}

export default () => {
  return (
    <ProConfigProvider>
      <Page />
    </ProConfigProvider>
  )
}
