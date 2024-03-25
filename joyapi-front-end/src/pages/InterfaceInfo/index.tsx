import VanillaJSONEditor from '@/components/JsonEditor/JsonEditor';
import {
  getInterfaceInfoVoByIdUsingGet,
  invokeInterfaceUsingPost,
} from '@/services/joy-api/interfaceInfoController';
import { LoadingOutlined } from '@ant-design/icons';
import { EditableProTable, PageContainer, ProColumns, ProField } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Form,
  message,
  Row,
  Skeleton,
  Spin,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Paragraph } = Typography;

type DataSourceType = {
  id: React.Key;
  paramName: string;
  paramValue: any;
};

const InterfaceInfoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>({});
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([
    {
      id: 1,
      paramName: '',
      paramValue: '',
    },
  ]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([1]);
  const [invokeData, setInvokeData] = useState<object>({});
  const [invokeParams, setInvokeParams] = useState<any>({});
  const [invokeResult, setInvokeResult] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoVoByIdUsingGet(param);
      if (res.code === 200) {
        setData(res.data || {});
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

  // 滚动到调试接口
  const invokeRef = React.createRef<HTMLDivElement>();
  const scrollToElement = () => {
    const element = invokeRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = rect.top + window.scrollY;
      const scrollPosition = elementTop - elementHeight + 200;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };
  // 调试接口
  // JSON编辑器
  const [content, setContent] = useState({
    json: {},
    text: undefined,
  });
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名',
      dataIndex: 'paramName',
      width: '20%',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      render: () => {
        return [
          <a key="editable" onClick={() => {}}>
            删除
          </a>,
        ];
      },
    },
  ];

  const onFinish = async () => {
    if (!data.id) {
      messageApi.error('接口不存在');
      return;
    }
    if (data.method === 'GET') {
      // GET请求
      setIsLoading(true);
      const res = await invokeInterfaceUsingPost({
        id: data.id,
        userRequestParams: JSON.stringify(invokeData),
      });
      if (res.code === 200) {
        setInvokeResult(res.data);
        setIsLoading(false);
      } else {
        setInvokeResult(res.data);
        messageApi.error('请检查参数后重试！');
        setIsLoading(false);
      }
    } else {
      // POST请求
      setIsLoading(true);
      // 如果invokeParams是空对象，则转换为JSON
      if (Object.keys(invokeParams).length === 0) {
        const res = await invokeInterfaceUsingPost({
          id: data.id,
          userRequestParams: JSON.stringify(invokeParams),
        });
        if (res.code === 200) {
          setInvokeResult(res.data);
          setIsLoading(false);
        } else {
          setInvokeResult(res.data);
          messageApi.error('请检查参数后重试！');
          setIsLoading(false);
        }
      } else {
        const res = await invokeInterfaceUsingPost({
          id: data.id,
          userRequestParams: invokeParams,
        });
        if (res.code === 200) {
          setInvokeResult(res.data);
          setIsLoading(false);
        } else {
          setInvokeResult(res.data);
          messageApi.error('请检查参数后重试！');
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    // 处理JSON格式
    if (content.text) {
      // @ts-ignore
      const newJson = content.text.replace(/[\n\s]/g, '');
      setInvokeParams(newJson);
    }
  }, [content]);

  useEffect(() => {
    // 处理GET请求参数
    if (dataSource) {
      const obj: any = {};
      dataSource.forEach((item) => {
        obj[item.paramName] = item.paramValue;
      });
      setInvokeData(obj);
    }
  }, [dataSource]);

  return (
    <>
      {contextHolder}
      <PageContainer title={'接口文档'}>
        <Card>
          <Skeleton active loading={loading}>
            {data && (
              <>
                <Descriptions
                  title={'接口名称：' + data.name}
                  items={items}
                  bordered
                  column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                  extra={
                    <Button type={'primary'} onClick={scrollToElement}>
                      调用
                    </Button>
                  }
                />
              </>
            )}
          </Skeleton>
        </Card>
        <Divider />
        <Card ref={invokeRef} title={'请求参数'}>
          <Form name="invoke" onFinish={onFinish} layout="vertical">
            <Form.Item name="userRequestParams">
              {data.method === 'GET' ? (
                <>
                  <EditableProTable<DataSourceType>
                    columns={columns}
                    rowKey="id"
                    value={dataSource}
                    onChange={setDataSource}
                    request={async () => ({
                      data: dataSource as DataSourceType[],
                      success: true,
                    })}
                    recordCreatorProps={{
                      newRecordType: 'dataSource',
                      // @ts-ignore
                      record: () => ({
                        id: Date.now(),
                      }),
                    }}
                    editable={{
                      type: 'multiple',
                      editableKeys,
                      actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete];
                      },
                      onValuesChange: (record, recordList) => {
                        setDataSource(recordList);
                      },
                      onChange: setEditableRowKeys,
                    }}
                  />
                </>
              ) : (
                <VanillaJSONEditor
                  mainMenuBar={false}
                  mode={'text'}
                  content={content}
                  onChange={setContent}
                />
              )}
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                调试
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div>
          {!isLoading ? (
            <>
              <Divider />
              <Card title="调试结果">
                <VanillaJSONEditor
                  mainMenuBar={false}
                  mode={'view'}
                  readOnly={true}
                  content={{
                    json: invokeResult,
                    text: JSON.stringify(invokeResult, null, 2),
                  }}
                />
              </Card>
            </>
          ) : (
            <>
              <Divider />
              <Card title="调试结果">
                <div
                  style={{
                    fontSize: '20px',
                    color: '#1890ff',
                    textAlign: 'center',
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
                    </Col>
                  </Row>
                  <span>请点击调试按钮...</span>
                </div>
              </Card>
            </>
          )}
        </div>
      </PageContainer>
    </>
  );
};
export default InterfaceInfoPage;
