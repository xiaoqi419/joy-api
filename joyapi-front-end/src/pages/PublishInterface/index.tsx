import { addInterfaceInfoUsingPost } from '@/services/joy-api/interfaceInfoController';
import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useRef } from 'react';

const PublishIInterfacePage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef<ProFormInstance>();

  // 格式化数据 参数包含数据，名称，类型
  const formatData = (data?: any, name?: any) => {
    return Object.assign(
      {},
      ...data.map((item: any) => ({
        [item[name + 'Name']]: item[name + 'Value'],
      })),
    );
  };

  // 获取StepsForm中所有的数据
  const handleGetFormData = async (values: any) => {
    let requestExample = {};
    let responseExample = {};
    let requestHeader = {};
    let responseHeader = {};
    // 请求示例
    if (values.requestExample) {
      requestExample = formatData(values.requestExample, 'request');
    }
    // 响应示例
    if (values.responseExample) {
      responseExample = formatData(values.responseExample, 'responseEp');
    }
    // 请求头
    if (values.requestHeader) {
      requestHeader = formatData(values.requestHeader, 'requestHeader');
      console.log(requestHeader);
    }
    // 响应头
    if (values.responseHeader) {
      responseHeader = formatData(values.responseHeader, 'responseHeader');
    }
    requestExample = JSON.stringify(requestExample);
    responseExample = JSON.stringify(responseExample);
    requestHeader = JSON.stringify(requestHeader);
    responseHeader = JSON.stringify(responseHeader);
    let params: API.InterfaceInfoAddRequest = {
      ...values,
      requestExample,
      responseExample,
      requestHeader,
      responseHeader,
    };
    const res = await addInterfaceInfoUsingPost(params);
    if (res.code === 200) {
      messageApi.success('创建成功');
      history.push('/interface-list/private');
    } else {
      messageApi.error('创建失败' + res.message);
    }
    console.log(params);
  };

  return (
    <>
      {contextHolder}
      <PageContainer>
        <ProCard bordered>
          <StepsForm<API.InterfaceInfo>
            formRef={formRef}
            onFinish={async (values) => {
              handleGetFormData(values);
            }}
            stepsProps={{
              direction: 'vertical',
            }}
            formProps={{
              validateMessages: {
                required: '此项为必填项',
              },
            }}
          >
            <StepsForm.StepForm
              name="base"
              title="接口基本信息"
              onFinish={async () => {
                return true;
              }}
            >
              <ProFormText
                name="name"
                width="md"
                label="接口名称"
                tooltip="最长为 1024 个字符"
                placeholder="请输入接口名称"
                rules={[{ required: true }, { max: 24 }]}
              />

              <ProFormText
                name="category"
                width="md"
                label="接口分类"
                tooltip="请输入正确的接口分类，例如: 生活、站长工具、短视频等"
                placeholder="请输入接口分类"
                rules={[{ required: true }, { max: 12 }]}
              />

              <ProFormText
                name="url"
                width="md"
                label="接口地址"
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
                name="description"
                width="md"
                label="接口描述"
                tooltip="最长为 512 个字符"
                placeholder="请输入接口描述"
                rules={[{ required: true }, { max: 512 }]}
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm name="params" title="接口参数">
              <ProFormList
                name={'requestHeader'}
                label="请求头"
                copyIconProps={{
                  Icon: SmileOutlined,
                  tooltipText: '复制这行到末尾',
                }}
                deleteIconProps={{
                  Icon: CloseCircleOutlined,
                  tooltipText: '不需要这行了',
                }}
                initialValue={[
                  {
                    requestHeaderValue: 'application/json',
                    requestHeaderName: 'Content-Type',
                  },
                ]}
                rules={[
                  {
                    required: true,
                    validator: () => {
                      // 如果为空则返回错误
                      if (!formRef.current?.getFieldValue('requestHeader')) {
                        return Promise.reject('请至少添加一个请求头');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <ProFormGroup key="group">
                  <ProFormText name="requestHeaderName" label="参数名" />
                  <ProFormText name="requestHeaderValue" label="参数值" width={'md'} />
                </ProFormGroup>
              </ProFormList>
              <ProFormList
                name={'responseHeader'}
                label="响应头"
                required={true}
                copyIconProps={{
                  Icon: SmileOutlined,
                  tooltipText: '复制这行到末尾',
                }}
                deleteIconProps={{
                  Icon: CloseCircleOutlined,
                  tooltipText: '不需要这行了',
                }}
                initialValue={[
                  {
                    responseHeaderValue: 'application/json',
                    responseHeaderName: 'Content-Type',
                  },
                ]}
                rules={[
                  {
                    required: true,
                    validator: () => {
                      // 如果为空则返回错误
                      if (!formRef.current?.getFieldValue('responseHeader')) {
                        return Promise.reject('请至少添加一个响应头');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <ProFormGroup key="group">
                  <ProFormText name="responseHeaderName" label="参数名" />
                  <ProFormText name="responseHeaderValue" label="参数值" width={'md'} />
                </ProFormGroup>
              </ProFormList>
              <ProFormList
                name={'requestExample'}
                label="请求参数"
                copyIconProps={{
                  Icon: SmileOutlined,
                  tooltipText: '复制这行到末尾',
                }}
                deleteIconProps={{
                  Icon: CloseCircleOutlined,
                  tooltipText: '不需要这行了',
                }}
              >
                <ProFormGroup key="group">
                  <ProFormText name="requestName" label="参数名" />
                  <ProFormText name="requestValue" label="参数值" width={'md'} />
                </ProFormGroup>
              </ProFormList>
              <ProFormList
                name={'responseExample'}
                label="响应参数"
                copyIconProps={{
                  Icon: SmileOutlined,
                  tooltipText: '复制这行到末尾',
                }}
                deleteIconProps={{
                  Icon: CloseCircleOutlined,
                  tooltipText: '不需要这行了',
                }}
                rules={[
                  {
                    required: true,
                    validator: () => {
                      // 如果为空则返回错误
                      if (!formRef.current?.getFieldValue('responseExample')) {
                        return Promise.reject('请至少添加一个响应参数');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <ProFormGroup key="group">
                  <ProFormText name="responseEpName" label="参数名" />
                  <ProFormTextArea name="responseEpValue" label="参数值" width={'md'} />
                </ProFormGroup>
              </ProFormList>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="info" title="信息展示">
              <Alert
                message="Warning"
                description="请仔细核对接口信息，确认无误后提交"
                type="warning"
                showIcon
              />
              <br />
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </PageContainer>
    </>
  );
};
export default PublishIInterfacePage;
