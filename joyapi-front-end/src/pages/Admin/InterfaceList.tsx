import {
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingPost
} from '@/services/joy-admin/interfaceController'
import {
  MoreOutlined,
  SmileOutlined,
  createFromIconfontCN
} from '@ant-design/icons'
import {
  PageContainer,
  ProCard,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-components'
import '@umijs/max'
import {
  Alert,
  Button,
  Card,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  Pagination,
  Popconfirm,
  Result,
  Space,
  Tag,
  Typography,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4443840_xl2yiy0b5p.js'
})
const { Paragraph } = Typography

interface Page {
  current: number
  pageSize: number
}

const Admin: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  // 分页数据
  let pageParm: Page = {
    current: 1,
    pageSize: 12
  }
  // 接口列表总数
  const [total, setTotal] = useState(0)
  // 接口列表
  const [interfaceList, setInterfaceList] = useState<API.InterfaceInfoVO[]>([])
  // 获取接口列表
  const getInterfaceList = async () => {
    const param = {
      ...pageParm
    }

    const res = await listInterfaceInfoByPageUsingPost(param)
    if (res.code === 200) {
      setInterfaceList(res.data?.records || [])
      setTotal(res.data?.total || 0)
    }
  }

  const onPageChange = (page: number, pageSize?: number) => {
    pageParm.current = page
    pageParm.pageSize = pageSize || 10
    getInterfaceList()
  }

  useEffect(() => {
    getInterfaceList()
  }, [])

  // 新建接口Modal
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const CreateInterface = () => {
    return (
      <StepsForm
        onFinish={async values => {
          console.log(values)
          setCreateModalVisible(false)
          messageApi.open({
            type: 'success',
            content: '提交成功'
          })
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项'
          }
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="新建接口"
              width={800}
              onCancel={() => setCreateModalVisible(false)}
              open={createModalVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          )
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="接口信息"
          onFinish={async () => {
            return true
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="接口名称"
            tooltip="最长为 24 个字符"
            placeholder="请输入接口名称"
            rules={[{ required: true }, { max: 24 }]}
          />

          <ProFormText
            name="category"
            width="md"
            label="接口分类"
            tooltip="请输入正确的接口分类，例如: 生活、站长工具、短视频等"
            placeholder="请输入接口分类"
            rules={[{ required: true }, { max: 12 }]}
          />
          <ProFormTextArea
            name="description"
            width="lg"
            label="接口描述"
            tooltip="最长为 512 个字符"
            placeholder="请输入接口描述"
            rules={[{ required: true }, { max: 512 }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormText
            name="url"
            width="md"
            label="接口地址"
            tooltip="格式为 http:// 或 https:// 开头的地址, 例如: http://xxx.com/api/xxx"
            placeholder="请输入接口地址"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  // 如果为空则返回错误
                  if (!value) {
                    callback()
                  }
                  if (
                    !/^(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*$/.test(
                      value
                    )
                  ) {
                    callback('请输入正确的接口地址')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormText
            name="method"
            width="md"
            label="请求方式"
            tooltip="请输入正确的请求方式，例如: GET, POST, PUT, DELETE"
            placeholder="请输入请求方式"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^(GET|POST|PUT|DELETE)$/i.test(value)) {
                    callback('请输入正确的请求方式')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormText
            name="requestExample"
            width="md"
            label="请求示例"
            tooltip="例如: https://zj.v.api.aa1.cn/api/xz/?code=654028207203"
            placeholder="请输入请求示例"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  // 如果为空则返回错误
                  if (!value) {
                    callback()
                  }
                  if (
                    !/^(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*$/.test(
                      value
                    )
                  ) {
                    callback('请输入正确的请求示例')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormTextArea
            name="responseExample"
            width="md"
            label="返回示例"
            tooltip="例如: {code: 200, msg: 'success', data: {}}"
            placeholder="请输入返回示例"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^{.*}$/.test(value)) {
                    callback('请输入正确的返回示例')
                  }
                  callback()
                }
              }
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="提交审核">
          <Result
            icon={<SmileOutlined />}
            title="点击提交按钮后请耐心等待接口信息审核！"
            extra={
              <Alert
                message="准确的信息填写将极大提高接口通过率！"
                type="success"
              />
            }
          />
        </StepsForm.StepForm>
      </StepsForm>
    )
  }

  // 管理接口Modal
  const [manageMoadalVisible, setManageModalVisible] = useState(false)
  const [InterfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo>({})
  const ManageInterface = () => {
    return (
      <StepsForm
        onFinish={async values => {
          console.log(values)
          await setManageModalVisible(false)
          messageApi.open({
            type: 'success',
            content: '提交成功'
          })
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项'
          }
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="管理接口"
              width={800}
              onCancel={() => setManageModalVisible(false)}
              open={manageMoadalVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          )
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="接口信息"
          onFinish={async () => {
            return true
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="接口名称"
            tooltip="最长为 24 个字符"
            initialValue={InterfaceInfo.name}
            placeholder="请输入接口名称"
            rules={[{ required: true }, { max: 24 }]}
          />

          <ProFormText
            name="category"
            width="md"
            label="接口分类"
            initialValue={InterfaceInfo.category}
            tooltip="请输入正确的接口分类，例如: 生活、站长工具、短视频等"
            placeholder="请输入接口分类"
            rules={[{ required: true }, { max: 12 }]}
          />
          <ProFormTextArea
            name="description"
            width="lg"
            label="接口描述"
            initialValue={InterfaceInfo.description}
            tooltip="最长为 512 个字符"
            placeholder="请输入接口描述"
            rules={[{ required: true }, { max: 512 }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormText
            name="url"
            width="md"
            label="接口地址"
            initialValue={InterfaceInfo.url}
            tooltip="格式为 http:// 或 https:// 开头的地址, 例如: http://xxx.com/api/xxx"
            placeholder="请输入接口地址"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  // 如果为空则返回错误
                  if (!value) {
                    callback()
                  }
                  if (
                    !/^(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*$/.test(
                      value
                    )
                  ) {
                    callback('请输入正确的接口地址')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormText
            name="method"
            width="md"
            label="请求方式"
            initialValue={InterfaceInfo.method}
            tooltip="请输入正确的请求方式，例如: GET, POST, PUT, DELETE"
            placeholder="请输入请求方式"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^(GET|POST|PUT|DELETE)$/i.test(value)) {
                    callback('请输入正确的请求方式')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormText
            name="requestExample"
            width="md"
            label="请求示例"
            initialValue={InterfaceInfo.requestExample}
            tooltip="例如: https://zj.v.api.aa1.cn/api/xz/?code=654028207203"
            placeholder="请输入请求示例"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  // 如果为空则返回错误
                  if (!value) {
                    callback()
                  }
                  if (
                    !/^(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*$/.test(
                      value
                    )
                  ) {
                    callback('请输入正确的请求示例')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormTextArea
            name="responseExample"
            width="md"
            label="返回示例"
            initialValue={InterfaceInfo.responseExample}
            tooltip="例如: {code: 200, msg: 'success', data: {}}"
            placeholder="请输入返回示例"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^{.*}$/.test(value)) {
                    callback('请输入正确的返回示例')
                  }
                  callback()
                }
              }
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="提交审核">
          <Result
            icon={<SmileOutlined />}
            title="点击提交按钮后请耐心等待接口信息审核！"
            extra={
              <Alert
                message="准确的信息填写将极大提高接口通过率！"
                type="success"
              />
            }
          />
        </StepsForm.StepForm>
      </StepsForm>
    )
  }

  // 新建接口Modal显示
  const createInterface = () => {
    setCreateModalVisible(true)
  }
  // 代处理的数据
  let interfaceBody: API.InterfaceInfo | null = null
  // 管理接口Modal显示
  const manageInterface = (el: any, val: API.InterfaceInfo) => {
    interfaceBody = val
    if (el.key === '1') {
      // 点击菜单传递该列表的值
      setInterfaceInfo(val)
      setManageModalVisible(true)
    }
  }

  // 删除接口
  const deleteInterface = async () => {
    let body = {
      id: interfaceBody!.id
    }
    const res = await deleteInterfaceInfoUsingPost(body)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '删除成功'
      })
      getInterfaceList()
    } else {
      messageApi.open({
        type: 'error',
        content: '删除失败'
      })
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a>管理</a>,
      icon: <IconFont type="icon-gongneng" />
    },
    {
      key: '2',
      label: (
        <Popconfirm title="确认删除该接口吗?" onConfirm={deleteInterface}>
          <a>删除</a>
        </Popconfirm>
      ),
      icon: <IconFont type="icon-quxiao" />
    }
  ]
  return (
    <>
      {contextHolder}
      <PageContainer>
        <div>
          <div
            style={{
              marginBottom: '5px'
            }}
          >
            <Card>
              <Button type="primary" onClick={createInterface}>
                新建接口
              </Button>
            </Card>
          </div>
          <div
            style={{
              marginTop: '20px'
            }}
          >
            <Flex
              vertical={false}
              justify={'space-between'}
              align={'center'}
              wrap="wrap"
              gap="middle"
            >
              {interfaceList &&
                interfaceList.map((item, index) => {
                  return (
                    <ProCard
                      key={index}
                      title={
                        <span
                          style={{
                            color: 'blue'
                          }}
                        >
                          {item.name}
                        </span>
                      }
                      style={{
                        maxWidth: 270
                      }}
                      hoverable
                      bordered
                      extra={
                        <div
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          {/* 为0显示关闭，1显示正常，2显示审核中 */}
                          {item.status === 0 ? (
                            <Tag color="red">关闭</Tag>
                          ) : item.status === 1 ? (
                            <Tag color="rgb(0, 168, 112)">正常</Tag>
                          ) : (
                            <Tag color="orange">审核中</Tag>
                          )}
                          <Dropdown
                            trigger={['click']}
                            menu={{
                              items,
                              onClick: el => manageInterface(el, item)
                            }}
                            arrow={{ pointAtCenter: true }}
                          >
                            <a onClick={e => e.preventDefault()}>
                              <Space>
                                <MoreOutlined style={{ fontSize: '20px' }} />
                              </Space>
                            </a>
                          </Dropdown>
                        </div>
                      }
                    >
                      <div
                        style={{
                          height: '120px'
                        }}
                      >
                        <span
                          style={{
                            color: 'rgb(0, 168, 112)'
                          }}
                        >
                          接口介绍：
                        </span>
                        <Paragraph ellipsis={true ? { rows: 4 } : false}>
                          <span
                            style={{
                              color: '#999999'
                            }}
                          >
                            {item.description}
                          </span>
                        </Paragraph>
                      </div>
                    </ProCard>
                  )
                })}
            </Flex>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          <Pagination
            simple
            pageSize={pageParm.pageSize}
            defaultCurrent={1}
            total={total}
            onChange={onPageChange}
          />
        </div>
        {createModalVisible && <CreateInterface />}
        {manageMoadalVisible && <ManageInterface />}
      </PageContainer>
    </>
  )
}
export default Admin
