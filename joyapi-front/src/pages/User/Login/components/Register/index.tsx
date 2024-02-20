import { register } from '@/services/ant-design-pro/api'
import { getRegisterCaptcha } from '@/services/ant-design-pro/login'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Button, Col, Form, Image, Input, Modal, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'

// TODO 完成注册功能

const Register: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const intl = useIntl()

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const Captcha = React.forwardRef(() => {
    const [captchaSrc, setCaptchaSrc] = useState('')
    const handleGetCaptcha = async () => {
      try {
        const response = await getRegisterCaptcha()
        const blob = new Blob([response], { type: 'image/png' })
        // 创建URL对象
        const objectUrl = URL.createObjectURL(blob)
        setCaptchaSrc(objectUrl)
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(() => {
      handleGetCaptcha()
    }, [])
    return <Image src={captchaSrc} onClick={handleGetCaptcha} preview={false} />
  })

  const [form] = Form.useForm() // 数据绑定用的form
  const captchaRef: any = React.createRef() // ref用于获取子组件的实例
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values: API.RegisterParams) => {
        // submit(values);
        console.log(values)
        // 校验
        const { userAccount, userPassword, checkPassword, code } = values
        if (!userAccount || !userPassword || !checkPassword || !code) {
          const defaultLoginFailureMessage = intl.formatMessage({
            id: 'pages.login.register.fail',
            defaultMessage: '注册失败，请重试！'
          })
          message.error(defaultLoginFailureMessage)
          return
        }
        try {
          // 注册
          setConfirmLoading(true)
          const res = await register(values)
          if (res.code === 200) {
            // 注册成功
            message.success(
              intl.formatMessage({
                id: 'pages.login.register.success',
                defaultMessage: '注册成功！'
              })
            )
            setOpen(false)
            form.resetFields()
          } else {
            // 注册失败
            message.error(res.message)
            captchaRef.current?.handleGetCaptcha()
          }
        } catch (error) {
          console.log(error)
          captchaRef.current?.handleGetCaptcha()
        }
      })
      .catch(e => {
        console.log(e)
        captchaRef.current?.handleGetCaptcha()
      })
  }

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 }
  }

  return (
    <>
      <Button type="link" onClick={showModal}>
        <FormattedMessage id="pages.login.registerAccount" />
      </Button>
      <Modal
        title={intl.formatMessage({
          id: 'pages.login.register'
        })}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            注册
          </Button>
        ]}
      >
        {
          // Register组件的内容
          <Form // 包裹在Form内。
            {...formItemLayout}
            form={form} // 绑定form，以根据form的值更新UI
            name="register"
            initialValues={{
              prefix: '86'
            }}
            scrollToFirstError
          >
            <Form.Item
              name="userAccount"
              label={intl.formatMessage({
                id: 'pages.login.account'
              })}
              rules={[
                {
                  pattern: /^[A-Za-z0-9]+$/,
                  message: (
                    <FormattedMessage id="pages.login.register.validAccount" />
                  )
                },
                {
                  required: true, // 必须输入
                  message: (
                    <FormattedMessage id="pages.login.username.required" />
                  )
                },
                {
                  min: 4,
                  max: 20,
                  message: <FormattedMessage id="pages.login.account.length" />
                }
              ]}
              hasFeedback
            >
              {/* 这个Form.Item包裹一个Input组件 */}
              <Input />
            </Form.Item>
            <Form.Item
              name="userPassword"
              label={intl.formatMessage({
                id: 'pages.login.password'
              })}
              rules={[
                {
                  required: true, // 必须输入
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  )
                },
                {
                  min: 8,
                  type: 'string',
                  message: (
                    <FormattedMessage
                      id="pages.login.password.len"
                      defaultMessage="密码不能小于8位！"
                    />
                  )
                },
                {
                  validator: (rule, value) => {
                    const promise = Promise
                    if (value && form.getFieldValue('confirm')) {
                      // 如果password和confirm都有值，那么就重新验证confirm。
                      form.validateFields(['confirm'])
                    }
                    return promise.resolve() // 自己则一定返回一个fulfilled的promise，不然会报错。
                  }
                }
              ]}
              hasFeedback // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
            >
              {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="checkPassword"
              label={intl.formatMessage({
                id: 'pages.login.confirmPassword'
              })}
              rules={[
                {
                  required: true, // 必须输入
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  )
                },
                ({ getFieldValue }) => ({
                  // ((form: FormInstance) => RuleConfig);  function动态获取form数据。
                  // Validator： (rule, value) => Promise
                  validator(rule, value) {
                    if (!value || getFieldValue('userPassword') === value) {
                      return Promise.resolve() // 如果没输入confirm，或者confirm和password一致，就返回一个fulfilled的promise
                    }

                    return Promise.reject(
                      <FormattedMessage id="pages.login.password.check" />
                    ) // 否则返回一个rejected的promise，并带上错误信息。
                  }
                })
              ]}
              hasFeedback // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
            >
              {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'pages.login.captcha'
              })}
              extra={intl.formatMessage({
                id: 'pages.login.captcha.tip'
              })}
            >
              <Row gutter={20}>
                {/* gutter 的单位是像素 */}
                {/* Row被划分为24格，用Col与Span属性设定宽度 */}
                <Col span={8}>
                  <Form.Item
                    name="code"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Please input the captcha you got!'
                      }
                    ]}
                  >
                    <Input maxLength={4} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Captcha ref={captchaRef}></Captcha>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        }
      </Modal>
    </>
  )
}

export default Register
