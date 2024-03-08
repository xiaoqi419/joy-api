import { StatisticCard } from '@ant-design/pro-components'
import { Flex } from 'antd'
import React, { useEffect } from 'react'
import JoyIcon from '../JoyIcon/JoyIcon'

const { Statistic } = StatisticCard
const iconStyle = {
  width: 56,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16
}

const TopStatisticCard: React.FC = () => {
  // 接口调用总次数折线图组件
  const Icon = (type: number) => {
    // 根据type来显示不同的图标
    switch (type) {
      case 1:
        return <JoyIcon type="icon-huiyuanguige" />
      case 2:
        return <JoyIcon type="icon-huiyuanguanli" />
      case 3:
        return <JoyIcon type="icon-duihuanma" />
      case 4:
        return <JoyIcon type="icon-huati" />
    }
  }
  // 不同分辨率设置不同的布局
  const [value, setValue] = React.useState<string>('horizontal')
  useEffect(() => {
    const resize = () => {
      // 当分辨率小于正常pc分辨率时，设置为垂直布局
      if (window.innerWidth < 1024) {
        setValue('vertical')
      } else {
        setValue('horizontal')
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <div style={{}}>
      <Flex gap="middle" justify="space-around" vertical={value === 'vertical'}>
        <StatisticCard
          chartPlacement="left"
          statistic={{
            title: '用户数',
            value: 112,
            suffix: '人',
            description: (
              <>
                <Statistic title="周同比" value="6.47%" trend="up" />
                <Statistic title="月同比" value="6.47%" trend="down" />
              </>
            ),
            icon: <div style={{ ...iconStyle }}>{Icon(2)}</div>,
            style: { margin: '0 auto' }
          }}
          style={{ maxWidth: 300, minWidth: 300 }}
        />
        <StatisticCard
          chartPlacement="left"
          statistic={{
            title: '接口调用总次数',
            value: 2345,
            suffix: '次',
            description: (
              <>
                <Statistic title="周同比" value="6.47%" trend="up" />
                <Statistic title="月同比" value="6.47%" trend="down" />
              </>
            ),
            icon: <div style={{ ...iconStyle }}>{Icon(1)}</div>,
            style: { margin: '0 auto' }
          }}
          style={{ maxWidth: 300, minWidth: 300 }}
        />

        <StatisticCard
          chartPlacement="left"
          statistic={{
            title: '通过审核接口数',
            value: 1193,
            suffix: '个',
            description: (
              <div>
                <Statistic title="周同比" value="6.47%" trend="up" />
                <Statistic title="月同比" value="6.47%" trend="down" />
              </div>
            ),
            icon: <div style={{ ...iconStyle }}>{Icon(3)}</div>,
            style: { margin: '0 auto' }
          }}
          style={{ maxWidth: 300, minWidth: 300 }}
        />

        <StatisticCard
          chartPlacement="left"
          statistic={{
            title: '用户意见反馈数',
            value: 113893,
            suffix: '次',
            description: (
              <>
                <Statistic title="周同比" value="6.47%" trend="up" />
                <Statistic title="月同比" value="6.47%" trend="down" />
              </>
            ),
            icon: <div style={{ ...iconStyle }}>{Icon(4)}</div>,
            style: { margin: '0 auto' }
          }}
          style={{ maxWidth: 300, minWidth: 300 }}
        />
      </Flex>
      <Flex style={{ marginTop: '20px' }}>
        <div>1</div>
      </Flex>
    </div>
  )
}

export default TopStatisticCard
