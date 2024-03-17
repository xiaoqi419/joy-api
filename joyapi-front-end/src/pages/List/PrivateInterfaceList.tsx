import {
  deleteInterfaceInfoUsingPost,
  listMyInterfaceInfoVoByPageUsingPost
} from '@/services/joy-api/interfaceInfoController'
import { PlusOutlined } from '@ant-design/icons'
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProTable,
  TableDropdown
} from '@ant-design/pro-components'
import { history } from '@umijs/max'
import { Button, Form, Modal, message } from 'antd'
import React, { useRef } from 'react'

const PrivateInterfaceListPage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [form] = Form.useForm<API.InterfaceInfoVO>()
  const [messageApi, contextHolder] = message.useMessage()

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

  // 新建公告
  const AddInterfaceButton = () => {
    return (
      <>
        <ModalForm<API.Notice>
          title="发布接口"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              发布接口
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run')
          }}
          width={500}
          submitTimeout={2000}
          onFinish={async values => {
            console.log(values)
          }}
          style={{
            textAlign: 'center'
          }}
        ></ModalForm>
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
          request={async (params = {} as Record<string, any>) => {
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
            },
            onChange(value) {
              console.log('value: ', value)
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
            pageSize: 5,
            onChange: page => console.log(page)
          }}
          dateFormatter="string"
          toolBarRender={() => [<AddInterfaceButton key={1} />]}
        />
      </PageContainer>
    </>
  )
}
export default PrivateInterfaceListPage
