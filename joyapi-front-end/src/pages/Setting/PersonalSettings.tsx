import { updateUserUsingPost } from '@/services/joy-admin/userController'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import {
  Card,
  Flex,
  GetProp,
  Tag,
  Typography,
  Upload,
  UploadProps,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const { Paragraph } = Typography

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const PersonalSetting: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [username, setUsername] = useState('')
  const [userProfile, setUserProfile] = useState('')

  let userInfo: API.UserUpdateRequest = {
    id: currentUser?.id,
    userName: username,
    userAvatar: imageUrl,
    userProfile: userProfile
  }
  async function updateUserInfo() {
    return await updateUserUsingPost(userInfo)
  }

  const { data, run } = useRequest(updateUserInfo, {
    debounceWait: 1000,
    manual: true
  })

  useEffect(() => {
    setUsername(currentUser?.userName || '')
    setUserProfile(currentUser?.userProfile || '')
  }, [])

  // 更新用户信息
  useEffect(() => {
    run()
    if (data) {
      if (data.code === 200) {
        messageApi.success('更新成功')
      } else {
        messageApi.error('更新失败')
      }
    }
  }, [username, userProfile, imageUrl])

  useEffect(() => {
    setImageUrl(currentUser?.userAvatar)
  }, [currentUser?.userAvatar])

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
        messageApi.success('上传成功')
      })
    }
  }

  // TODO 上传头像接口

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
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
              <Flex
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50
                }}
                gap={'middle'}
                justify="space-around"
              >
                <h4 style={{ margin: 0 }}>用户ID:</h4>
                <h2 style={{ margin: 0 }}> {currentUser?.id}</h2>
              </Flex>
              <Flex
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50
                }}
                gap={'middle'}
                justify="space-around"
              >
                <h4 style={{ margin: 0 }}>用户名:</h4>
                <Typography.Title
                  editable={{ onChange: setUsername }}
                  level={4}
                  style={{ margin: 0 }}
                >
                  {username}
                </Typography.Title>
              </Flex>
              <Flex
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50
                }}
                gap={'middle'}
                justify="space-around"
              >
                <h4 style={{ margin: 0 }}>简介:</h4>
                <Paragraph
                  editable={{
                    maxLength: 50,
                    autoSize: { maxRows: 5, minRows: 3 },
                    onChange: setUserProfile
                  }}
                  style={{ margin: 0, fontSize: 16, fontWeight: 'bold' }}
                >
                  {userProfile}
                </Paragraph>
              </Flex>
              <Flex
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50
                }}
                gap={'middle'}
                justify="space-around"
              >
                <h4 style={{ margin: 0 }}>用户组：</h4>
                {currentUser?.userRole === 'admin' ? (
                  <Tag color="#f50"> 管理员</Tag>
                ) : (
                  <Tag color="#108ee9">普通用户</Tag>
                )}
              </Flex>
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
