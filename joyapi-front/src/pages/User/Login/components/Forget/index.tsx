import { FormattedMessage } from '@/.umi/plugin-locale'
import { forget, getEmailCaptcha } from '@/services/ant-design-pro/login'
import { useIntl } from '@umijs/max'
import { Button, Form, Input, Modal, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'

type FieldType = {
  captcha?: string
  email?: string
  account?: string
  password?: string
}

const ForgetPassword: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading] = useState(false)
  const intl = useIntl()

  const showModal = () => {
    setOpen(true)
  }

  const form = Form.useForm<FieldType>()[0]
  const handleOk = () => {
    form.validateFields().then(async (values: FieldType) => {
      // 忘记密码
      const res = await forget(values)
      if (res.code === 200) {
        //修改密码成功
        message.success('修改密码成功')
        setOpen(false)
        // 移除验证码时间
        localStorage.removeItem('countdownEnd')
        form.resetFields()
      } else {
        message.error(res.message)
      }
    })
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }

  // 获取验证码按钮组件
  const CaptchaButton: React.FC = () => {
    const [countdown, setCountdown] = useState(0)

    // 在组件加载时获取倒计时
    useEffect(() => {
      const countdownEnd = localStorage.getItem('countdownEnd')
      if (countdownEnd) {
        const remaining = Math.ceil(
          (parseInt(countdownEnd) - Date.now()) / 1000
        )
        if (remaining > 0) {
          setCountdown(remaining)
        }
      }
    }, [])

    useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        return () => clearTimeout(timer)
      }
    }, [countdown])

    const handleClick = async () => {
      // 在这里发送验证码
      // 邮箱是否为空
      if (form.getFieldValue('email') === undefined) {
        message.error(
          intl.formatMessage({
            id: 'pages.login.email.required'
          })
        )
        return
      }
      //邮箱是否格式正确
      if (
        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
          form.getFieldValue('email')
        )
      ) {
        message.error(
          intl.formatMessage({
            id: 'pages.login.forget.email.invalid'
          })
        )
        return
      }
      // 发送邮
      const res = await getEmailCaptcha({ email: form.getFieldValue('email') })
      if (res.code === 200) {
        message.success('验证码已发送至您的邮箱')
        // 开始倒计时
        const countdownEnd = Date.now() + 60 * 1000
        localStorage.setItem('countdownEnd', countdownEnd.toString())
        setCountdown(60)
      }
    }

    return (
      <Button onClick={handleClick} disabled={countdown > 0}>
        {countdown > 0 ? (
          `${countdown}` +
          intl.formatMessage({ id: 'pages.login.captcha.reGet' })
        ) : (
          <FormattedMessage id="pages.login.phoneLogin.getVerificationCode" />
        )}
      </Button>
    )
  }

  return (
    <>
      <Button type="link" onClick={showModal}>
        <FormattedMessage
          id="pages.login.forgotPassword"
          defaultMessage="忘记密码"
        />
      </Button>
      <Modal
        title={intl.formatMessage({
          id: 'pages.login.forgotPassword',
          defaultMessage: '忘记密码'
        })}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          {...formItemLayout}
          style={{ maxWidth: 600, marginTop: 20 }}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label={intl.formatMessage({
              id: 'pages.login.email'
            })}
            name="email"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.email.required" />
              },
              {
                pattern:
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: (
                  <FormattedMessage id="pages.login.forget.email.invalid" />
                )
              }
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            hasFeedback
            label={intl.formatMessage({
              id: 'pages.login.account'
            })}
            name="account"
            rules={[
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: (
                  <FormattedMessage id="pages.login.register.validAccount" />
                )
              },
              {
                required: true, // 必须输入
                message: <FormattedMessage id="pages.login.username.required" />
              },
              {
                min: 4,
                max: 20,
                message: <FormattedMessage id="pages.login.account.length" />
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={intl.formatMessage({
              id: 'pages.login.newPassword'
            })}
            name="password"
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
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label={intl.formatMessage({
              id: 'pages.login.captcha'
            })}
            name="captcha"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.captcha.required" />
              },
              {
                min: 6,
                message: <FormattedMessage id="pages.login.captcha.length" />
              }
            ]}
            hasFeedback
            extra={intl.formatMessage({
              id: 'pages.login.captcha.extra'
            })}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input maxLength={6} />
              <CaptchaButton />
            </Space.Compact>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ForgetPassword
