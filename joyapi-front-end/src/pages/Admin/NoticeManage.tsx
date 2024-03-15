import {
  addNoticeUsingPost,
  getNoticeListUsingPost
} from '@/services/joy-api/noticeController'
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
import { Button, Form, Modal, message } from 'antd'
import React, { useRef, useState } from 'react'

type NoticeItem = {
  id: number
  content: string
  createTime: string
  updateTime: string
}

const NoticeManage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [form] = Form.useForm<NoticeItem>()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState<API.Notice[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  // 公告内容弹窗
  const ContentModal = () => {
    return (
      <Modal
        title="公告内容"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        {data.find(item => item.id === currentId)?.content}
      </Modal>
    )
  }

  const columns: ProColumns<API.Notice>[] = [
    {
      dataIndex: 'id',
      title: '序号',
      key: 'id',
      width: 80,
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
      dataIndex: 'createTime',
      valueType: 'date',
      sorter: true
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
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
            action?.startEditable?.(record.id!)
          }}
        >
          编辑
        </a>,
        <a
          target="_blank"
          rel="noopener noreferrer"
          key="view"
          onClick={() => {
            setIsOpen(true)
            setCurrentId(record.id)
          }}
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
  // 新建公告
  const AddNoticeButton = () => {
    return (
      <>
        <ModalForm<API.Notice>
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
            const res = await addNoticeUsingPost(values)
            if (res.code === 200) {
              messageApi.success('添加成功')
              actionRef.current?.reload()
              return true
            }
            return false
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
        <ProTable<API.Notice>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {} as Record<string, any>) => {
            const param: API.getNoticeListUsingPOSTParams = {
              current: params.current,
              pageSize: params.pageSize,
              ...params
            }
            const response = await getNoticeListUsingPost(param)
            setData(response.data?.records || [])
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
          toolBarRender={() => [<AddNoticeButton key={1} />]}
        />
        <ContentModal />
      </PageContainer>
    </>
  )
}
export default NoticeManage
