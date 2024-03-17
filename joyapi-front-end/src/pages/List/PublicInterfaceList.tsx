import { listInterfaceInfoVoByPageUsingPost } from '@/services/joy-api/interfaceInfoController'
import { PageContainer } from '@ant-design/pro-components'
import { Alert, Card, List, message } from 'antd'
import React, { useEffect, useState } from 'react'

const PublicInterfaceList: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [list, setList] = useState<API.InterfaceInfoVO[]>([])
  const [total, setTotal] = useState<number>(0)

  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true)
    try {
      // 分页查询
      let param = {
        current: current,
        pageSize: pageSize
      }
      const res = await listInterfaceInfoVoByPageUsingPost(param)
      if (res.code === 200) {
        setList(res.data?.records || [])
        setTotal(res.data?.total || 0)
      }
    } catch (error) {
      messageApi.error('获取接口列表失败，' + error)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {contextHolder}
      <PageContainer>
        <Alert
          message="温馨提示"
          description="更多接口请前往前台界面进行查看~"
          type="info"
          showIcon
        />
        <br />
        <Card>
          <List
            pagination={{
              align: 'center',
              pageSize: 5,
              onChange: (current, pageSize) => loadData(current, pageSize),
              total: total,
              showTotal: (total: number) => `共 ${total} 条`
            }}
            className="infinite-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    href={`/interface-info/${item.id}`}
                  >
                    查看
                  </a>
                ]}
              >
                <List.Item.Meta
                  title={<a href={`/interface-info/${item.id}`}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </PageContainer>
    </>
  )
}
export default PublicInterfaceList
