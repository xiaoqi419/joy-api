import { updateMyUserUsingPost } from '@/services/joy-admin/userController'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Flex,
  Form,
  GetProp,
  Input,
  Tag,
  Upload,
  UploadProps,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'

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

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    更改信息
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
          <Card style={{ width: 600 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Flex>
      </PageContainer>
    </>
  )
}
export default PersonalSetting
