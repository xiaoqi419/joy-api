// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建公告 新建公告 POST /api/notice/addNotice */
export async function addNoticeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addNoticeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/notice/addNotice', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除公告 删除公告 POST /api/notice/deleteNotice */
export async function deleteNoticeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteNoticeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/notice/deleteNotice', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取最新的公告 获取最新的六条公告 GET /api/notice/getNewestNotice */
export async function getNewestNoticeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListNotice_>('/api/notice/getNewestNotice', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新公告 更新公告 POST /api/notice/updateNotice */
export async function updateNoticeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateNoticeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/notice/updateNotice', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
