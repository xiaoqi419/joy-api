// 登录接口
import { request } from '@/utils/http';
import { API } from './typings';

/** 用户登录 POST /api/user/login */
export async function loginUserUsePost (
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request.post<API.BaseResponseLoginUserVO_>('/user/login', {
    ...body
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/** 用户注销 POST /user/logout */
export async function logoutUserUsePost (options?: { [key: string]: any }) {
  return request.post<API.BaseResponseBoolean_>('/user/logout', {
    ...(options || {})
  });
}
