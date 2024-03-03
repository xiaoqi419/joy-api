import {
  auditInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingPost
} from '@/services/joy-admin/interfaceController'
import { SmileOutlined } from '@ant-design/icons'
import {
  PageContainer,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProList,
  StepsForm
} from '@ant-design/pro-components'
import { Alert, Button, Modal, Result, Tag, Typography, message } from 'antd'

import React, { Key, useState } from 'react'
const { Paragraph } = Typography

const ApprovedInterfacePage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  // 刷新状态
  const [dataSource, setDataSource] = useState<API.InterfaceInfo[]>()
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => {
      setSelectedRowKeys(keys)
    }
  }

  // 获取审核的接口列表
  const getAuditInterfaceList = async (key: number) => {
    // 重置选择的Id
    setSelectedRowKeys([])
    const param: API.InterfaceInfoQueryRequest = {
      status: 2,
      current: 1,
      pageSize: 8
    }
    const response = await listInterfaceInfoByPageUsingPost(param)
    if (response.code === 200) {
      setDataSource(response.data?.records)
      if (key === 2) {
        messageApi.open({
          type: 'success',
          content: '刷新成功'
        })
      }
    } else {
      messageApi.open({
        type: 'error',
        content: response.message
      })
    }
  }

  // 通过接口
  const handleApprove = async (
    interfaceParam: API.InterfaceInfoAuditRequest
  ) => {
    // 如果参数为空则提示
    if (interfaceParam.id === undefined && selectedRowKeys.length === 0) {
      messageApi.open({
        type: 'warning',
        content: '请选择要审核的接口'
      })
      return
    }
    // 将selectedRowKeys传递给后端

    const param: API.InterfaceInfoAuditRequest = {
      auditStatus: interfaceParam.auditStatus,
      id: interfaceParam.id === undefined ? selectedRowKeys : interfaceParam.id
    } as API.InterfaceInfoAuditRequest
    const res = await auditInterfaceInfoUsingPost(param)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '操作成功'
      })
      getAuditInterfaceList(1)
    } else {
      messageApi.open({
        type: 'error',
        content: res.message
      })
    }
  }

  // 对接口进行操作Modal
  const ManageInterface = (value: any) => {
    const interfaceInfo = value.value
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <a onClick={() => setVisible(true)}>操作</a>
        <StepsForm
          onFinish={async values => {
            console.log(values)
            let array = [interfaceInfo.id]
            let param = {
              id: array,
              auditStatus: values.auditStatus
            }
            handleApprove(param)
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项'
            }
          }}
          stepsFormRender={(dom, submitter) => {
            return (
              <Modal
                title="审核接口信息"
                width={800}
                onCancel={() => setVisible(false)}
                open={visible}
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
            title="接口基本信息"
            onFinish={async () => {
              return true
            }}
          >
            <ProFormText
              name="id"
              width="md"
              label="接口ID"
              initialValue={interfaceInfo.id}
              disabled
            />
            <ProFormText
              name="name"
              width="md"
              label="接口名称"
              placeholder="请输入名称"
              initialValue={interfaceInfo.name}
              disabled
            />
            <ProFormText
              name="category"
              width="md"
              label="接口分类"
              initialValue={interfaceInfo.category}
              placeholder="请输入接口分类"
              disabled
            />
            <ProFormTextArea
              name="description"
              label="接口描述"
              width="md"
              initialValue={interfaceInfo.description}
              placeholder="请输入接口描述"
              disabled
            />
            <ProFormText
              name="url"
              width="md"
              label="接口地址"
              initialValue={interfaceInfo.url}
              placeholder="请输入接口地址"
              disabled
            />
            <ProFormText
              name="method"
              width="md"
              label="请求方式"
              initialValue={interfaceInfo.method}
              tooltip="请输入正确的请求方式，例如: GET, POST, PUT, DELETE"
              placeholder="请输入请求方式"
              disabled
            />
            <ProFormText
              name="requestExample"
              width="md"
              label="请求示例"
              initialValue={interfaceInfo.requestExample}
              placeholder="请输入请求示例"
              disabled
            />
            <ProFormTextArea
              name="responseExample"
              width="md"
              label="返回示例"
              initialValue={interfaceInfo.responseExample}
              placeholder="请输入返回示例"
              disabled
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="checkbox" title="审核接口">
            <ProFormRadio.Group
              name="auditStatus"
              label="审核结果"
              options={[
                {
                  label: '通过',
                  value: '1'
                },
                {
                  label: '不通过',
                  value: '0'
                }
              ]}
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="提交">
            <Result
              icon={<SmileOutlined />}
              title="点击下一步查看接口审核情况！"
              extra={
                <div>
                  <Alert message="请操作员仔细检查接口信息！" type="info" />
                </div>
              }
            />
          </StepsForm.StepForm>
        </StepsForm>
      </div>
    )
  }

  return (
    <>
      {contextHolder}
      <PageContainer>
        <ProList<any>
          request={async (params = {} as Record<string, any>) => {
            const param: API.InterfaceInfoQueryRequest = {
              status: 2,
              current: params.current,
              pageSize: params.pageSize,
              ...params
            }
            const response = await listInterfaceInfoByPageUsingPost(param)
            setDataSource(response.data?.records)
            return {
              success: response.code === 200 ? true : false,
              total: response.data?.total
            }
          }}
          pagination={{
            defaultPageSize: 8,
            showSizeChanger: true
          }}
          search={{}}
          metas={{
            title: {
              dataIndex: 'name',
              title: '接口名称',
              render: (text, row) => {
                return (
                  <span
                    style={{
                      fontSize: 16
                    }}
                  >
                    {row.name}
                  </span>
                )
              }
            },
            subTitle: {
              dataIndex: 'method',
              title: '请求方式',
              valueType: 'select',
              valueEnum: {
                GET: { text: 'GET' },
                POST: { text: 'POST' },
                DELETE: { text: 'DELETE' },
                PUT: { text: 'PUT' }
              },
              render: (text, row) => {
                return row.method === 'GET' ? (
                  <Tag color="#1E90FF">GET</Tag>
                ) : row.method === 'POST' ? (
                  <Tag color="#5BD8A6">POST</Tag>
                ) : row.method === 'DELETE' ? (
                  <Tag color="red">DELETE</Tag>
                ) : (
                  <Tag color="orange">PUT</Tag>
                )
              }
            },

            content: {
              dataIndex: 'description',
              title: '描述',
              search: false,
              render: (text, row) => {
                return (
                  <div>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: 10
                      }}
                    >
                      接口简介：
                    </span>
                    <Paragraph
                      ellipsis={{
                        rows: 4
                      }}
                      title={`${row.description}...`}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          color: '#666666'
                        }}
                      >
                        {row.description}
                      </span>
                    </Paragraph>
                  </div>
                )
              }
            },

            actions: {
              render: (text, row) => [
                <ManageInterface value={row} key={text} />
              ],
              search: false
            }
          }}
          toolBarRender={() => [
            <Button
              key="4"
              type="primary"
              onClick={() => handleApprove({ auditStatus: 1 })}
            >
              通过
            </Button>,
            <Button
              key="5"
              type="primary"
              onClick={() => handleApprove({ auditStatus: 0 })}
            >
              不通过
            </Button>,
            <Button
              key="3"
              type="primary"
              onClick={() => getAuditInterfaceList(2)}
            >
              刷新
            </Button>
          ]}
          rowKey="id"
          rowSelection={rowSelection}
          dataSource={dataSource}
          showActions="hover"
          grid={{ gutter: 8, column: 4 }}
        />
      </PageContainer>
    </>
  )
}
export default ApprovedInterfacePage
