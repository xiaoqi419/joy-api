// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 创建接口 创建接口信息 POST /api/InterfaceInfo/add */
export async function addInterfaceInfoUsingPost(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/InterfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 审核接口 审核接口信息 POST /api/InterfaceInfo/audit */
export async function auditInterfaceInfoUsingPost(
  body: API.InterfaceInfoAuditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/InterfaceInfo/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 删除接口 删除接口信息 POST /api/InterfaceInfo/delete */
export async function deleteInterfaceInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/InterfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 根据id获取接口 根据id获取接口信息 GET /api/InterfaceInfo/get/vo */
export async function getInterfaceInfoVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInterfaceInfoVO_>(
    '/api/InterfaceInfo/get/vo',
    {
      method: 'GET',
      params: {
        ...params
      },
      ...(options || {})
    }
  )
}

/** 分页获取接口列表（仅管理员） 分页获取接口信息列表 POST /api/InterfaceInfo/list/page */
export async function listInterfaceInfoByPageUsingPost(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfo_>(
    '/api/InterfaceInfo/list/page',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {})
    }
  )
}

/** 分页获取接口列表 分页获取接口信息列表 POST /api/InterfaceInfo/list/page/vo */
export async function listInterfaceInfoVoByPageUsingPost(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfoVO_>(
    '/api/InterfaceInfo/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {})
    }
  )
}

/** 分页获取当前用户创建的接口列表 分页获取当前用户创建的接口信息列表 POST /api/InterfaceInfo/my/list/page/vo */
export async function listMyInterfaceInfoVoByPageUsingPost(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfoVO_>(
    '/api/InterfaceInfo/my/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {})
    }
  )
}

/** 分页搜索接口列表 分页搜索接口信息列表 POST /api/InterfaceInfo/search/page/vo */
export async function searchInterfaceInfoVoByPageUsingPost(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfoVO_>(
    '/api/InterfaceInfo/search/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {})
    }
  )
}

/** 更新接口 更新接口信息 POST /api/InterfaceInfo/update */
export async function updateInterfaceInfoUsingPost(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/InterfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
