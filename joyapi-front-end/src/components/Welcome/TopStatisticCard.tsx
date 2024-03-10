import { CalendarTwoTone, CloudTwoTone } from '@ant-design/icons'
import { StatisticCard } from '@ant-design/pro-components'
import { Chart } from '@antv/g2'
import { Card, Flex, Progress, Segmented } from 'antd'
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
  // 接口调用总次数组件
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
  // 柱形图组件
  const Bar = () => {
    const data = [
      { day: '周一', value: 122, type: '接口调用次数' },
      { day: '周一', value: 241, type: '接口申请次数' },
      { day: '周二', value: 123, type: '接口调用次数' },
      { day: '周二', value: 21, type: '接口申请次数' },
      { day: '周三', value: 129, type: '接口调用次数' },
      { day: '周三', value: 321, type: '接口申请次数' },

      { day: '周四', value: 123, type: '接口调用次数' },
      { day: '周四', value: 17, type: '接口申请次数' },

      { day: '周五', value: 129, type: '接口调用次数' },
      { day: '周五', value: 23, type: '接口申请次数' },

      { day: '周六', value: 123, type: '接口调用次数' },
      { day: '周六', value: 76, type: '接口申请次数' },

      { day: '周日', value: 129, type: '接口调用次数' },
      { day: '周日', value: 232, type: '接口申请次数' }
    ]
    const chart = new Chart({
      container: 'container',
      autoFit: true
    })
    chart.options({
      type: 'interval',
      autoFit: true,
      data: data,
      encode: { x: 'day', y: 'value', color: 'type' },
      legend: {
        color: {
          position: 'bottom',
          flipPage: false,
          layout: {
            justifyContent: 'center'
          },
          title: false,
          tick: false
        }
      },
      transform: [{ type: 'dodgeX' }],
      interaction: { elementHighlight: { background: true } }
    })
    chart.interaction('tooltip', {
      shared: true
    })
    chart.render()
    return chart.getContainer()
  }
  useEffect(() => {
    Bar()
  }, [])
  // 不同分段渲染不同的图表
  // TODO 未完成week和lastWeek的数据
  const renderChart = (value: string) => {
    if (value === 'week') {
      Bar()
    } else {
      Bar()
    }
  }
  return (
    <div
      style={{
        width: '100%'
      }}
    >
      <Flex gap="large" justify="space-around" vertical={value === 'vertical'}>
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
          style={{ maxWidth: 300, minWidth: 280, width: 280 }}
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
          style={{ maxWidth: 300, minWidth: 280, width: 280 }}
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
          style={{ maxWidth: 300, minWidth: 280, width: 280 }}
        />

        <StatisticCard
          chartPlacement="left"
          statistic={{
            title: '接口提交次数',
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
          style={{ maxWidth: 300, minWidth: 280, width: 280 }}
        />
      </Flex>
      <Flex
        gap="large"
        justify="space-around"
        vertical={value === 'vertical'}
        style={{ marginTop: '20px' }}
      >
        <Card
          style={{
            minWidth: 380,
            width: '97%'
          }}
          title={'分析概览'}
          extra={
            <Segmented
              defaultValue="week"
              style={{ marginBottom: 8, fontWeight: 'bold' }}
              onChange={value => renderChart(value)}
              options={[
                { label: '上周', value: 'lastWeek', icon: <CalendarTwoTone /> },
                { label: '本周', value: 'week', icon: <CloudTwoTone /> }
              ]}
            />
          }
        >
          {/* 分析概览 */}
          <div id="container" style={{ height: 300 }} />
        </Card>
        <Card style={{ width: '30%' }} title="接口调用成功率">
          <Flex vertical>
            <Flex>
              <Progress
                percent={50}
                status="active"
                size={[180, 20]}
                format={percent => {
                  return (
                    <span
                      style={{
                        width: 50,
                        right: '10%',
                        top: 0,
                        fontSize: 12,
                        lineHeight: '20px',
                        color: '#108ee9',
                        fontWeight: 'bold'
                      }}
                    >
                      {percent}%
                    </span>
                  )
                }}
              />
              <span style={{ width: 50 }}>周一</span>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  )
}

export default TopStatisticCard
