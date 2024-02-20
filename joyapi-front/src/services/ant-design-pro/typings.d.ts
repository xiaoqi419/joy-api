// @ts-ignore
/* eslint-disable */

declare namespace API {
  // 后端通用响应结构
  type Response<T> = {
    /** 响应数据 */
    data?: T
    /** 响应码  */
    code?: number
    /** 响应消息 */
    message?: string
    /** 数据数 */
    total?: number
  }

  type PageVO = {
    current?: number
    size?: number
  }

  type UserInfoItem = {
    id?: number
    userName?: string
    userAvatar?: string
    userAccount?: string
    userStatus?: number
    createTime?: string
    updateTime?: string
    userRole?: number
  }

  type UserInfoBySearchVO = {
    userSearchVO: UserInfoItem | T
    pageVO: {
      current?: number
      size?: number
    }
  }

  type CurrentUser = {
    id: number | string
    userName?: string
    userAvatar?: string
    userAccount?: string
    userStatus?: number
    createTime?: string
    updateTime?: string
    userRole?: string
  }

  type LoginResult = {
    code?: number
    type?: string
    currentAuthority?: string
  }

  type RegisterResult = {
    code?: number
    message?: string
    data?: T
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type LoginParams = {
    account?: string
    password?: string
    autoLogin?: boolean
    type?: string
  }

  type RegisterParams = {
    /** 账号 */
    userAccount?: string
    /** 密码 */
    userPassword?: string
    /** 确认密码 */
    checkPassword?: boolean
    /** 验证码 */
    code?: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }
}
