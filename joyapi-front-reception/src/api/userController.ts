// 登录接口
import { request } from '@/utils/http';
import { API } from './typings';

/** 用户登录 POST /api/user/login */
export async function loginUserUsePost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request.get<API.BaseResponseLoginUserVO_>('/api/user/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  });
}
