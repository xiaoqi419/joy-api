import '@/assets/styles/NoticeIcon.less'
import { JoyIcon } from '@/components'
import { getNewestNoticeUsingGet } from '@/services/joy-api/noticeController'
import { CalendarTwoTone, CloudTwoTone } from '@ant-design/icons'
import {
  PageContainer,
  Statistic,
  StatisticCard
} from '@ant-design/pro-components'
import { Chart } from '@antv/g2'
import {
  Card,
  Col,
  Flex,
  Progress,
  Row,
  Segmented,
  Timeline,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'

const iconStyle = {
  width: 56,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16
}

const Welcome: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  // Icon组件
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

  // 渲染图表
  useEffect(() => {
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
  }, [])

  // 不同分段渲染不同的图表
  // TODO 未完成week和lastWeek的数据
  const renderChart = (value: string) => {
    if (value === 'week') {
      console.log('week')
    } else {
      console.log('lastWeek')
    }
  }

  // 接口调用成功率数据对象
  let successRateData = [
    { day: '周一', value: 50 },
    { day: '周二', value: 60 },
    { day: '周三', value: 70 },
    { day: '周四', value: 80 },
    { day: '周五', value: 90 },
    { day: '周六', value: 100 },
    { day: '周日', value: 90 }
  ]

  // 公告组件图标
  const NoticeIcon = () => {
    return <div className="point"></div>
  }

  // 获取公告数据
  const [notice, setNotice] = useState<API.Notice[]>([])
  useEffect(() => {
    getNewestNoticeUsingGet().then(res => {
      if (res.code === 200) {
        setNotice(res.data || [])
      } else {
        messageApi.error(res.message)
      }
    })
  }, [])

  return (
    <>
      {contextHolder}
      <PageContainer>
        <Row gutter={[16, 16]}>
          {/* 顶端卡片统计 */}
          <Col className="gutter-row" span={6}>
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
            />
          </Col>
          <Col className="gutter-row" span={6}>
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
            />
          </Col>
          <Col className="gutter-row" span={6}>
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
            />
          </Col>
          <Col className="gutter-row" span={6}>
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
            />
          </Col>
          {/* 中部图表统计 */}
          <Col className="gutter-row" span={18}>
            <Card
              style={{
                width: '100%'
              }}
              styles={{
                body: {
                  paddingBottom: 0
                }
              }}
              title={'分析概览'}
              extra={
                <Segmented
                  defaultValue="week"
                  style={{ marginBottom: 8, fontWeight: 'bold' }}
                  onChange={value => renderChart(value)}
                  options={[
                    {
                      label: '上周',
                      value: 'lastWeek',
                      icon: <CalendarTwoTone />
                    },
                    { label: '本周', value: 'week', icon: <CloudTwoTone /> }
                  ]}
                />
              }
            >
              {/* 分析概览 */}
              <div
                id="container"
                style={{
                  height: 300,
                  width: '100%'
                }}
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              style={{ width: '100%' }}
              title="接口调用成功率"
              styles={{
                body: {
                  paddingBottom: 0
                }
              }}
            >
              <Flex vertical>
                <Flex vertical>
                  {successRateData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 19.5
                        }}
                      >
                        <Progress
                          percent={item.value}
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
                        <span style={{ width: 50 }}>{item.day}</span>
                      </div>
                    )
                  })}
                </Flex>
              </Flex>
            </Card>
          </Col>
          <Col span={18}>
            <Card title="数据统计">1</Card>
          </Col>
          <Col span={6}>
            <Card
              title="最新动态"
              styles={{
                body: {
                  paddingBottom: 0
                }
              }}
            >
              <Timeline
                items={notice.map(item => {
                  return {
                    children: item.content,
                    dot: <NoticeIcon />
                  }
                })}
              />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  )
}

export default Welcome
