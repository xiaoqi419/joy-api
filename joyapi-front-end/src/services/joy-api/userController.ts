/* eslint-disable */
// @ts-ignore
import { request } from '@umijs/max';

/** 查看用户AccessKey GET /api/user/accessKey */
export async function getAccessKeyUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/user/accessKey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 重新生成用户AccessKey POST /api/user/accessKey */
export async function updateAccessKeyUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/user/accessKey', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 创建用户 POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码获取 GET /api/user/captcha */
export async function getCaptchaUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/user/captcha', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询用户信息 GET /api/user/current */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO_>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱验证码获取 POST /api/user/email */
export async function getEmailCodeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmailCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/email', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 忘记密码 POST /api/user/forget */
export async function forgetPasswordUsingPost(
  body: API.UserForgetRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/forget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取用户 GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登录用户 GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据 id 获取用户封装 GET /api/user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO_>('/api/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取用户列表（仅管理员） POST /api/user/list/page */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUser_>('/api/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取用户封装列表 POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO_>('/api/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录（微信开放平台） GET /api/user/login/wx_open */
export async function userLoginByWxOpenUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userLoginByWxOpenUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login/wx_open', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注销 POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户注册 POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新个人信息 POST /api/user/update/my */
export async function updateMyUserUsingPost(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 POST /api/user/update/password */
export async function updatePasswordUsingPost(
  body: API.UserUpdatePasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
