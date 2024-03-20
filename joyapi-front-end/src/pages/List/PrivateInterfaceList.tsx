import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listMyInterfaceInfoVoByPageUsingPost
} from '@/services/joy-api/interfaceInfoController'
import { PlusOutlined } from '@ant-design/icons'
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormText,
  ProFormTextArea,
  ProTable,
  TableDropdown
} from '@ant-design/pro-components'
import { history } from '@umijs/max'
import { Button, Form, Modal, message } from 'antd'
import React, { useRef, useState } from 'react'

const PrivateInterfaceListPage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [form] = Form.useForm<API.InterfaceInfoVO>()
  const [messageApi, contextHolder] = message.useMessage()
  const [visible, setVisible] = useState<boolean>(false)

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      key: 'id',
      width: 80,
      align: 'center',
      editable: false
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      copyable: true,
      ellipsis: true,
      width: 200,
      align: 'center',
      tooltip: '内容过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项'
          }
        ]
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      copyable: true,
      ellipsis: true,
      width: 500,
      align: 'center',
      tooltip: '内容过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项'
          }
        ]
      }
    },
    {
      title: '创建时间',
      align: 'center',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      editable: false
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      valueType: 'date',
      align: 'center',
      editable: false
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          key="editable"
          onClick={() => {
            // TODO 跳转到编辑
            history.push(`/interface-info/edit/${record.id}`)
          }}
        >
          编辑
        </a>,
        <a
          target="_blank"
          rel="noopener noreferrer"
          key="view"
          onClick={() => {
            // 跳转到接口详情页面
            history.push(`/interface-info/${record.id}`)
          }}
        >
          查看
        </a>,
        <TableDropdown
          key="more"
          onSelect={key => {
            if (key === 'delete') {
              Modal.confirm({
                title: '删除接口',
                content: (
                  <>
                    确定删除接口：
                    <span
                      style={{
                        color: 'red'
                      }}
                    >
                      {record.name}
                    </span>
                    吗？
                  </>
                ),
                onOk: async () => {
                  const res = await deleteInterfaceInfoUsingPost({
                    id: record.id
                  })
                  if (res.code === 200) {
                    messageApi.success('删除成功')
                    actionRef.current?.reload()
                  } else {
                    messageApi.error('删除失败')
                  }
                }
              })
            }
          }}
          menus={[{ key: 'delete', name: '删除' }]}
        />
      ]
    }
  ]

  // 发布接口
  const AddInterfaceButton = () => {
    return (
      <>
        <ModalForm<API.InterfaceInfo>
          title="发布接口"
          open={visible}
          trigger={
            <Button
              type="primary"
              onClick={() => history.push('/publish-interface/')}
            >
              <PlusOutlined />
              发布接口
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => setVisible(false)
          }}
          width={500}
          submitTimeout={2000}
          onFinish={async values => {
            const res = await addInterfaceInfoUsingPost(values)
            if (res.code === 200) {
              messageApi.success('发布成功!')
              setVisible(false)
              actionRef.current?.reload()
            } else {
              messageApi.error('发布失败,' + res.message || '未知错误')
            }
          }}
          style={{
            textAlign: 'center'
          }}
        >
          <ProFormText
            name="name"
            width="lg"
            label="接口名称"
            tooltip="最长为 24 个字符"
            placeholder="请输入接口名称"
            rules={[{ required: true }, { max: 24 }]}
          />

          <ProFormText
            name="category"
            width="lg"
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
          <ProFormText
            name="url"
            width="lg"
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
            width="lg"
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
          <ProFormTextArea
            name="requestExample"
            width="lg"
            label="请求示例"
            tooltip="例如: https://zj.v.api.aa1.cn/api/xz/?code=654028207203"
            placeholder="请输入请求示例"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="requestHeader"
            width="lg"
            label="请求头"
            placeholder="请输入请求头"
            initialValue={`{"Content-Type": "application/json;charset=UTF-8"}`}
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^{.*}$/.test(value)) {
                    callback('请输入正确的响应头')
                  }
                  callback()
                }
              }
            ]}
          />

          <ProFormText
            name="responseHeader"
            width="lg"
            label="响应头"
            initialValue={`{"Content-Type": "application/json;charset=UTF-8"}`}
            placeholder="请输入响应头"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback()
                  }
                  if (!/^{.*}$/.test(value)) {
                    callback('请输入正确的响应头')
                  }
                  callback()
                }
              }
            ]}
          />
          <ProFormTextArea
            name="responseExample"
            width="lg"
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
        </ModalForm>
      </>
    )
  }

  return (
    <>
      {contextHolder}
      <PageContainer>
        <ProTable<API.InterfaceInfoVO>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {} ) => {
            const param: API.getNoticeListUsingPOSTParams = {
              current: params.current,
              pageSize: params.pageSize,
              ...params
            }
            const response = await listMyInterfaceInfoVoByPageUsingPost(param)
            return {
              success: response.code === 200 ? true : false,
              total: response.data?.total,
              data: response.data?.records || [],
              pageSize: params.pageSize,
              current: params.current
            }
          }}
          editable={{
            type: 'multiple'
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            defaultValue: {
              option: { fixed: 'right', disable: true }
            }
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto'
          }}
          options={{
            setting: {
              listsHeight: 400
            }
          }}
          pagination={{
            pageSize: 5
          }}
          dateFormatter="string"
          toolBarRender={() => [<AddInterfaceButton key={1} />]}
        />
      </PageContainer>
    </>
  )
}
export default PrivateInterfaceListPage
