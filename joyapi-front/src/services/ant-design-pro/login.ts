// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string
  },
  options?: { [key: string]: any }
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 注册获取验证码接口 GET /api/user/captcha */
export async function getRegisterCaptcha() {
  return request<any>('/api/user/captcha', {
    method: 'GET',
    responseType: 'blob'
  })
}

/** 退出接口 GET /api/user/logout */
export async function logout() {
  return request<API.Response<boolean>>('/api/user/logout', {
    method: 'POST'
  })
}

/** 忘记密码接口 POST /api/user/forget */
export async function forget(
  params: {
    // query
    /** 邮箱 */
    email?: string
    /** 验证码 */
    captcha?: string
    /** 密码 */
    password?: string
  },
  options?: { [key: string]: any }
) {
  return request<API.Response<boolean>>('/api/user/forget', {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 获取忘记密码邮箱验证码 POST /api/user/email */
export async function getEmailCaptcha(
  params: {
    // query
    /** 邮箱 */
    email?: string
  },
  options?: { [key: string]: any }
) {
  return request<API.Response<boolean>>('/api/user/email', {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}
