import { PlusOutlined } from '@ant-design/icons'
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormTextArea,
  ProTable,
  TableDropdown
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import React, { useRef } from 'react'

type NoticeItem = {
  id: number
  content: string
  createTime: string
  updateTime: string
}

const columns: ProColumns<NoticeItem>[] = [
  {
    dataIndex: 'id',
    title: '序号',
    key: 'id',
    valueType: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
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
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updated_at',
    valueType: 'date',
    align: 'center',
    sorter: true
  },
  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <a
        href={`/admin/notice/${record.id}`}
        target="_blank"
        rel="noopener noreferrer"
        key="view"
      >
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }
]

const NoticeManage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [form] = Form.useForm<NoticeItem>()
  const [messageApi, contextHolder] = message.useMessage()

  // 新建公告
  const AddNoticeButton = () => {
    return (
      <>
        <ModalForm<NoticeItem>
          title="新建公告"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建公告
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
            console.log(values.id)
            messageApi.success('提交成功')
            return true
          }}
          style={{
            textAlign: 'center'
          }}
        >
          <ProFormTextArea
            width="md"
            name="content"
            placeholder="请输入公告"
            rules={[{ required: true, message: '请输入公告' }]}
          />
        </ModalForm>
      </>
    )
  }

  return (
    <>
      {contextHolder}
      <PageContainer>
        <ProTable<NoticeItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params, sort, filter) => {
            console.log(sort, filter)

            return {
              data: [],
              success: true
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
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime]
                }
              }
              return values
            }
          }}
          pagination={{
            pageSize: 5,
            onChange: page => console.log(page)
          }}
          dateFormatter="string"
          toolBarRender={() => [<AddNoticeButton key={1} />]}
        />
      </PageContainer>
    </>
  )
}
export default NoticeManage
