import {
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingPost,
  updateInterfaceInfoUsingPost,
} from '@/services/joy-api/interfaceInfoController';
import { createFromIconfontCN, MoreOutlined, SmileOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { history } from '@umijs/max';
import {
  Alert,
  Badge,
  Button,
  Card,
  Dropdown,
  Empty,
  Flex,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Result,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4443840_xl2yiy0b5p.js',
});
const { Paragraph } = Typography;

interface Page {
  current: number;
  pageSize: number;
}

const Admin: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // 分页数据
  let pageParam: Page = {
    current: 1,
    pageSize: 12,
  };
  // 接口列表总数
  const [total, setTotal] = useState(0);
  // 接口列表
  const [interfaceList, setInterfaceList] = useState<API.InterfaceInfoVO[]>([]);
  const formRef = useRef<ProFormInstance>();
  // 获取接口列表
  const getInterfaceList = async () => {
    const param = {
      ...pageParam,
    };

    const res = await listInterfaceInfoByPageUsingPost(param);
    if (res.code === 200) {
      setInterfaceList(res.data?.records || []);
      setTotal(res.data?.total || 0);
    }
  };

  const onPageChange = (page: number, pageSize?: number) => {
    pageParam.current = page;
    pageParam.pageSize = pageSize || 10;
    getInterfaceList();
  };

  useEffect(() => {
    getInterfaceList();
  }, []);

  // 管理接口Modal
  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [InterfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo>({});
  const ManageInterface = () => {
    return (
      <StepsForm
        formRef={formRef}
        onFinish={async (values) => {
          console.log(values);
          // 提交
          const res = await updateInterfaceInfoUsingPost({
            ...values,
            status: 2,
            id: InterfaceInfo.id,
          });
          if (res.code === 200) {
            messageApi.open({
              type: 'success',
              content: '提交成功',
            });
            setManageModalVisible(false);
            // 刷新
            await getInterfaceList();
          } else {
            messageApi.open({
              type: 'error',
              content: res.message,
            });
          }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="管理接口"
              width={800}
              onCancel={() => setManageModalVisible(false)}
              open={manageModalVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="接口信息"
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="接口名称"
            tooltip="最长为 24 个字符"
            initialValue={InterfaceInfo.name}
            placeholder="请输入接口名称"
            rules={[{ required: true }, { max: 24 }]}
          />

          <ProFormText
            name="category"
            width="md"
            label="接口分类"
            initialValue={InterfaceInfo.category}
            tooltip="请输入正确的接口分类，例如: 生活、站长工具、短视频等"
            placeholder="请输入接口分类"
            rules={[{ required: true }, { max: 12 }]}
          />
          <ProFormTextArea
            name="description"
            width="lg"
            label="接口描述"
            initialValue={InterfaceInfo.description}
            tooltip="最长为 512 个字符"
            placeholder="请输入接口描述"
            rules={[{ required: true }, { max: 512 }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormText
            name="url"
            width="md"
            label="接口地址"
            initialValue={InterfaceInfo.url}
            tooltip="格式为 http:// 或 https:// 开头的地址, 例如: http://xxx.com/api/xxx"
            placeholder="请输入接口地址"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  // 如果为空则返回错误
                  if (!value) {
                    callback();
                  }
                  if (
                    !/^(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*$/.test(
                      value,
                    )
                  ) {
                    callback('请输入正确的接口地址');
                  }
                  callback();
                },
              },
            ]}
          />
          <ProFormText
            name="method"
            width="md"
            label="请求方式"
            initialValue={InterfaceInfo.method}
            tooltip="请输入正确的请求方式，例如: GET, POST, PUT, DELETE"
            placeholder="请输入请求方式"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback();
                  }
                  if (!/^(GET|POST|PUT|DELETE)$/i.test(value)) {
                    callback('请输入正确的请求方式');
                  }
                  callback();
                },
              },
            ]}
          />
          <ProFormTextArea
            name="requestHeader"
            width="md"
            label="请求头"
            initialValue={InterfaceInfo.requestHeader}
            tooltip={`"例如: {"Content-Type": "application/json"}`}
            placeholder="请输入请求头"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="responseHeader"
            width="md"
            label="响应头"
            initialValue={InterfaceInfo.responseHeader}
            tooltip={`"例如: {"Content-Type": "application/json"}`}
            placeholder="请输入响应头"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="requestExample"
            width="md"
            label="请求示例"
            initialValue={InterfaceInfo.requestExample}
            tooltip="例如: https://zj.v.api.aa1.cn/api/xz/?code=654028207203"
            placeholder="请输入请求示例"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="responseExample"
            width="md"
            label="返回示例"
            initialValue={InterfaceInfo.responseExample}
            tooltip={`"例如: {"code": 200, "msg": "success", "data": {}}"`}
            placeholder="请输入返回示例"
            rules={[
              { required: true },
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback();
                  }
                  if (!/^{.*}$/.test(value)) {
                    callback('请输入正确的返回示例');
                  }
                  callback();
                },
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="提交审核">
          <Result
            icon={<SmileOutlined />}
            title="点击提交按钮后请耐心等待接口信息审核！"
            extra={<Alert message="准确的信息填写将极大提高接口通过率！" type="success" />}
          />
        </StepsForm.StepForm>
      </StepsForm>
    );
  };

  // 代处理的数据
  let interfaceBody: API.InterfaceInfo | null = null;
  // 管理接口Modal显示
  const manageInterface = (el: any, val: API.InterfaceInfo) => {
    interfaceBody = val;
    console.log(val);
    if (el.key === '1') {
      // 点击菜单传递该列表的值
      setInterfaceInfo(val);
      setManageModalVisible(true);
    }
  };

  // 删除接口
  const deleteInterface = async () => {
    let body = {
      id: interfaceBody!.id,
    };
    const res = await deleteInterfaceInfoUsingPost(body);
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '删除成功',
      });
      await getInterfaceList();
    } else {
      messageApi.open({
        type: 'error',
        content: '删除失败',
      });
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a>管理</a>,
      icon: <IconFont type="icon-gongneng" />,
    },
    {
      key: '2',
      label: (
        <Popconfirm title="确认删除该接口吗?" onConfirm={deleteInterface}>
          <a>删除</a>
        </Popconfirm>
      ),
      icon: <IconFont type="icon-quxiao" />,
    },
  ];

  // 接口查询类型
  type FieldType = {
    name: string;
    status: number;
    method: string;
    category: string;
    userId: number;
  };

  //查询接口
  const [form] = Form.useForm<FieldType>();
  const onFinish = async (values: FieldType) => {
    console.log('Success:', values);
    const res = await listInterfaceInfoByPageUsingPost({
      ...values,
      ...pageParam,
    });
    if (res.code === 200) {
      setInterfaceList(res.data?.records || []);
      setTotal(res.data?.total || 0);
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <PageContainer
        extra={
          <Button
            style={{
              float: 'left',
              marginTop: '20px',
            }}
            type="primary"
            onClick={() => {
              history.push('/publish-interface/');
            }}
          >
            发布接口
          </Button>
        }
      >
        <div>
          <div
            style={{
              marginBottom: '5px',
            }}
          >
            <Card>
              <Form
                form={form}
                name="basic"
                autoComplete="off"
                layout={'inline'}
                style={{ maxWidth: 'none' }}
                onFinish={(values) => {
                  onFinish(values);
                }}
              >
                <Form.Item<FieldType>
                  label="接口名称"
                  name="name"
                  style={{
                    width: 280,
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="接口状态" name="status">
                  <Select allowClear style={{ width: 200 }}>
                    <Select.Option value={0}>下线</Select.Option>
                    <Select.Option value={1}>上线</Select.Option>
                    <Select.Option value={2}>审核中</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType> label="请求方式" name="method">
                  <Select allowClear style={{ width: 200 }}>
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType> label="接口类型" name="category">
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  style={{
                    marginTop: '20px',
                    width: 280,
                  }}
                  label="创建人ID"
                  name="userId"
                >
                  <Input />
                </Form.Item>
                <div
                  style={{
                    display: 'flex',
                    marginLeft: '52.8%',
                  }}
                >
                  <Form.Item
                    style={{
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      htmlType="reset"
                      onClick={() => {
                        form.resetFields();
                        getInterfaceList();
                        messageApi.success('重置成功');
                      }}
                    >
                      重置
                    </Button>
                  </Form.Item>
                  <Form.Item
                    style={{
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        form.submit();
                        messageApi.success('刷新成功');
                      }}
                    >
                      刷新
                    </Button>
                  </Form.Item>
                  <Form.Item
                    style={{
                      marginTop: '20px',
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </div>
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <Flex
              vertical={false}
              align={'center'}
              wrap="wrap"
              gap="middle"
              justify={'space-between'}
            >
              {/* 如果interfaceList有值显示列表，否则显示加载组件 */}

              {interfaceList ? (
                interfaceList.map((item, index) => {
                  return (
                    <ProCard
                      key={index}
                      title={
                        <span
                          style={{
                            color: 'blue',
                          }}
                        >
                          {item.name}
                        </span>
                      }
                      style={{
                        maxWidth: 280,
                      }}
                      hoverable
                      bordered
                      extra={
                        <div
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          {item.status === 0 ? (
                            <Badge status="error" text="offline" style={{ marginRight: '10px' }} />
                          ) : item.status === 1 ? (
                            <Badge status="success" text="online" style={{ marginRight: '10px' }} />
                          ) : (
                            <Badge
                              status="processing"
                              text="审核中"
                              style={{ marginRight: '10px' }}
                            />
                          )}
                          <Dropdown
                            trigger={['click']}
                            menu={{
                              items,
                              onClick: (el) => manageInterface(el, item),
                            }}
                            arrow={{ pointAtCenter: true }}
                          >
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                <MoreOutlined style={{ fontSize: '20px' }} />
                              </Space>
                            </a>
                          </Dropdown>
                        </div>
                      }
                    >
                      <div
                        style={{
                          height: '120px',
                        }}
                      >
                        <span
                          style={{
                            color: 'rgb(0, 168, 112)',
                          }}
                        >
                          接口介绍：
                        </span>
                        <Paragraph ellipsis={{ rows: 4 }}>
                          <span
                            style={{
                              color: '#999999',
                            }}
                          >
                            {item.description}
                          </span>
                        </Paragraph>
                      </div>
                    </ProCard>
                  );
                })
              ) : (
                <Spin />
              )}
            </Flex>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {interfaceList.length === 0 && <Empty />}
          {interfaceList.length > 0 && (
            <Pagination
              simple
              pageSize={pageParam.pageSize}
              defaultCurrent={1}
              total={total}
              onChange={onPageChange}
            />
          )}
        </div>
        {manageModalVisible && <ManageInterface />}
      </PageContainer>
    </>
  );
};
export default Admin;
