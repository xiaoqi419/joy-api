﻿import type { RequestOptions } from '@@/plugin-request/request'
import type { RequestConfig } from '@umijs/max'
import { message as AntDMessage, notification } from 'antd'

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
  PARAMS_ERROR = 40000
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any
  code?: number
  message?: string
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: res => {
      const { data, message, code } = res as unknown as ResponseStructure
      if (code !== 200) {
        const error: any = new Error(message)
        error.name = 'BizError'
        error.info = { code, message, data }
        throw error // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info
        if (errorInfo) {
          const { message, code } = errorInfo
          switch (errorInfo.code) {
            case ErrorShowType.SILENT:
              // do nothing
              break
            case ErrorShowType.PARAMS_ERROR:
              AntDMessage.warning(message)
              break
            case ErrorShowType.ERROR_MESSAGE:
              AntDMessage.error(message)
              break
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: message,
                message: code
              })
              break
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break
            default:
              AntDMessage.error(message)
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        AntDMessage.error(`Response status:${error.response.status}`)
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        AntDMessage.error('None response! Please retry.')
      } else {
        // 发送请求时出了点问题
        AntDMessage.error('Request error, please retry.')
      }
    }
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url
      return { ...config, url }
    }
  ],

  // 响应拦截器
  responseInterceptors: [
    response => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure

      if (data?.success === false) {
        AntDMessage.error('请求失败！')
      }
      return response
    }
  ]
}
