import { getInterfaceInfoVoByIdUsingGet } from '@/services/joy-api/interfaceInfoController';
import { PageContainer, ProField } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Badge, Card, Descriptions, DescriptionsProps, Skeleton, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Paragraph } = Typography;

const InterfaceInfoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>({});
  const [messageApi, contextHolder] = message.useMessage();
  const param = useParams();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoVoByIdUsingGet(param);
      if (res.code === 200) {
        setData(res.data || {});
        console.log(data);
      }
    } catch (error) {
      messageApi.error('获取接口信息失败，' + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 展示接口信息
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '描述',
      children: <p>{data.description}</p>,
    },
    {
      key: '2',
      label: '请求地址',
      children: (
        <p>
          <Paragraph copyable={{ text: data.url }}>{data.url}</Paragraph>
        </p>
      ),
    },
    {
      key: '3',
      label: '请求方式',
      children: <p>{data.method}</p>,
    },

    {
      key: '6',
      label: '接口状态',
      children: (
        <p>
          {data.status === 0 ? (
            <Badge status="error" text="关闭" style={{ marginRight: '10px' }} />
          ) : data.status === 1 ? (
            <Badge status="success" text="正常" style={{ marginRight: '10px' }} />
          ) : (
            <Badge status="processing" text="审核中" style={{ marginRight: '10px' }} />
          )}
        </p>
      ),
    },
    {
      key: '4',
      label: '请求头',
      children: (
        <p>
          <ProField mode={'read'} valueType={'jsonCode'} text={data.requestHeader} />
        </p>
      ),
    },
    {
      key: '5',
      label: '响应头',
      children: (
        <p>
          <ProField mode={'read'} valueType={'jsonCode'} text={data.responseHeader} />
        </p>
      ),
    },
    {
      key: '7',
      label: '请求示例',
      children: (
        <p>
          <ProField text={data.requestExample} mode={'read'} valueType={'jsonCode'} />
        </p>
      ),
    },
    {
      key: '8',
      label: '响应示例',
      children: (
        <p>
          <ProField text={data.responseExample} mode={'read'} valueType={'jsonCode'} />
        </p>
      ),
    },

    {
      key: '9',
      label: '创建时间',
      children: <p>{dayjs(data.createTime).format('YYYY-MM-DD ddd HH:mm:ss').toString()}</p>,
    },
    {
      key: '10',
      label: '更新时间',
      children: <p>{dayjs(data.updateTime).format('YYYY-MM-DD ddd HH:mm:ss').toString()}</p>,
    },
  ];

  return (
    <>
      {contextHolder}
      <PageContainer title={'查看接口文档'}>
        <Card>
          <Skeleton active loading={loading}>
            {data && (
              <Descriptions
                title={data.name}
                items={items}
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              />
            )}
          </Skeleton>
        </Card>
      </PageContainer>
    </>
  );
};
export default InterfaceInfoPage;
