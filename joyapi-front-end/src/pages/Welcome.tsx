import TopStatisticCard from '@/components/Welcome/TopStatisticCard'
import { PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { Card, message } from 'antd'
import React, { useEffect } from 'react'

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const [messageApi, contextHolder] = message.useMessage()
  const showAdminMsg = () => {
    if (initialState?.currentUser?.userRole === 'admin') {
      messageApi.success('欢迎您，超级管理员~')
    } else {
      messageApi.success('欢迎您，尊敬的用户~')
    }
  }

  useEffect(() => {
    showAdminMsg()
  }, [])
  return (
    <div>
      {contextHolder}
      <PageContainer>
        <Card
          style={{
            borderRadius: 8,
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)'
          }}
        >
          <TopStatisticCard />
        </Card>
      </PageContainer>
    </div>
  )
}

export default Welcome
