import {
  getAccessKeyUsingGet,
  updateAccessKeyUsingPost,
  updateMyUserUsingPost,
  updatePasswordUsingPost,
  userLogoutUsingPost
} from '@/services/joy-api/userController'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  PageContainer,
  ProFormInstance,
  ProFormText,
  stringify
} from '@ant-design/pro-components'
import { history, useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Flex,
  Form,
  GetProp,
  Input,
  Row,
  Tag,
  Typography,
  Upload,
  UploadProps,
  message
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt1M = file.size / 1024 / 1024 < 1
  if (!isLt1M) {
    message.error('Image must smaller than 1MB!')
  }
  return isJpgOrPng && isLt1M
}

const PersonalSetting: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [username, setUsername] = useState('')
  const [userProfile, setUserProfile] = useState('')
  const uploadAvatarUrl = 'http://localhost:8101/api/file/uploadUserAvatar'

  let userInfo: API.UserUpdateRequest = {
    id: currentUser?.id,
    userName: username,
    userAvatar: imageUrl,
    userProfile: userProfile
  }

  // 防抖更新用户信息
  async function updateUserInfo() {
    return await updateMyUserUsingPost(userInfo)
  }
  const { data, run } = useRequest(updateUserInfo, {
    debounceWait: 300,
    manual: true
  })
  useEffect(() => {
    if (data !== undefined) {
      console.log(data)
      if (data.code === 200) {
        messageApi.success('更新成功')
      } else {
        messageApi.error('更新失败,' + data.message || '未知错误')
      }
    }
  }, [data])

  // 初始化用户信息
  useEffect(() => {
    setImageUrl(currentUser?.userAvatar)
    setUsername(currentUser?.userName || '')
    setUserProfile(currentUser?.userProfile || '')
  }, [currentUser])
  // 上传头像
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(info.file.response.data)

      messageApi.success('上传成功')
    }
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // 修改密码组件
  const [form] = Form.useForm<API.UserUpdatePasswordRequest>()
  const restFormRef = useRef<ProFormInstance>()
  const ChangePassword = () => {
    return (
      <ModalForm<API.UserUpdatePasswordRequest>
        title="修改密码"
        trigger={<Button type="primary">修改密码</Button>}
        form={form}
        width={400}
        formRef={restFormRef}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true
        }}
        submitter={{
          searchConfig: {
            resetText: '重置'
          },
          resetButtonProps: {
            onClick: () => {
              restFormRef.current?.resetFields()
              //   setModalVisible(false);
            }
          }
        }}
        submitTimeout={2000}
        onFinish={async values => {
          const res = await updatePasswordUsingPost(values)
          if (res.code === 200) {
            // 两秒倒计时
            messageApi.success('修改成功，即将退出登录！')
            // 退出登录并跳转到登录页
            setTimeout(async () => {
              await userLogoutUsingPost()
              const { search, pathname } = window.location
              const urlParams = new URL(window.location.href).searchParams
              /** 此方法会跳转到 redirect 参数所在的位置 */
              const redirect = urlParams.get('redirect')
              // Note: There may be security issues, please note
              if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                  pathname: '/user/login',
                  search: stringify({
                    redirect: pathname + search
                  })
                })
              }
            }, 2000)
          } else {
            messageApi.error('修改失败,' + res.message || '未知错误')
          }
          return false
        }}
      >
        <ProFormText.Password
          width="md"
          name="oldPassword"
          label="旧密码"
          placeholder="请输入旧密码"
          rules={[{ required: true }, { min: 8 }, { max: 20 }]}
        />

        <ProFormText.Password
          width="md"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          rules={[{ required: true }, { min: 8 }, { max: 20 }]}
        />
      </ModalForm>
    )
  }

  // 右侧功能区
  const [accessKey, setAccessKey] = useState('')
  const { Paragraph } = Typography
  const selectAccessKey = async () => {
    const res = await getAccessKeyUsingGet()
    if (res.code === 200) {
      setAccessKey(res.data!)
      messageApi.success('获取成功')
    } else {
      messageApi.error('获取失败,' + res.message || '未知错误')
    }
  }
  const updateAccessKey = async () => {
    const res = await updateAccessKeyUsingPost()
    if (res.code === 200) {
      setAccessKey(res.data!)
      messageApi.success('更新成功')
    } else {
      messageApi.error('获取失败,' + res.message || '未知错误')
    }
  }
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'AccessKey',
      children: (
        <p>
          {accessKey ? (
            <div
              style={{
                marginTop: 5
              }}
            >
              <Paragraph copyable>{accessKey}</Paragraph>{' '}
              <Button
                type="primary"
                onClick={() => {
                  setAccessKey('')
                }}
              >
                隐藏
              </Button>
              &nbsp;
              <Button type="primary" onClick={updateAccessKey}>
                重新生成
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={selectAccessKey}>
              生成
            </Button>
          )}
        </p>
      )
    }
  ]

  return (
    <>
      {contextHolder}
      <PageContainer>
        <Flex gap={'middle'} justify="space-around">
          <Card style={{ width: 600 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* 头像组件 */}
              <span>
                <Upload
                  name="file"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={uploadAvatarUrl}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%'
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </span>
              <Form
                {...formItemLayout}
                variant="filled"
                style={{ maxWidth: 600 }}
                onFinish={() => {
                  run()
                }}
              >
                <Form.Item label="用户ID" name="id">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    {currentUser?.id}
                  </span>
                </Form.Item>
                <Form.Item label="用户组" name="Select">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    {currentUser?.userRole === 'admin' ? (
                      <Tag color="magenta">管理员</Tag>
                    ) : (
                      <Tag color="green">普通用户</Tag>
                    )}
                  </span>
                </Form.Item>
                <Form.Item
                  label="用户名"
                  name="userName"
                  rules={[{ required: true, message: 'Please input!' }]}
                  initialValue={currentUser?.userName}
                >
                  <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="简介"
                  name="userProfile"
                  rules={[{ required: true, message: 'Please input!' }]}
                  initialValue={currentUser?.userProfile}
                >
                  <Input.TextArea
                    value={userProfile}
                    onChange={e => setUserProfile(e.target.value)}
                  />
                </Form.Item>

                <Row gutter={24}>
                  <Col className="gutter-row" span={10}>
                    <ChangePassword />
                  </Col>
                  <Col className="gutter-row" span={10}>
                    <Button type="primary" htmlType="submit">
                      更改信息
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card>
          <Card style={{ width: 600 }}>
            <Descriptions
              title="接口调用"
              items={items}
              column={1}
              labelStyle={{
                lineHeight: '32px'
              }}
            />
          </Card>
        </Flex>
      </PageContainer>
    </>
  )
}
export default PersonalSetting
