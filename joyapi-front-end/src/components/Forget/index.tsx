import {
  forgetPasswordUsingPost,
  getEmailCodeUsingPost
} from '@/services/joy-admin/userController'
import { Button, Form, Input, Modal, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'

type FieldType = {
  captcha?: string
  email?: string
  userAccount?: string
  userPassword?: string
}

const ForgetPassword: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading] = useState(false)

  const form = Form.useForm<FieldType>()[0]
  const handleOk = () => {
    form.validateFields().then(async (values: FieldType) => {
      // 忘记密码
      const res = await forgetPasswordUsingPost(values)
      if (res.code === 200) {
        //修改密码成功
        message.success(res.message)
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
        message.error('邮箱不能为空')
        return
      }
      //邮箱是否格式正确
      if (
        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
          form.getFieldValue('email')
        )
      ) {
        message.error('请输入正确的邮箱格式')
        return
      }
      // 发送邮
      const res = await getEmailCodeUsingPost({
        email: form.getFieldValue('email')
      })
      if (res.code === 200) {
        message.success(res.message)
        // 开始倒计时
        const countdownEnd = Date.now() + 60 * 1000
        localStorage.setItem('countdownEnd', countdownEnd.toString())
        setCountdown(60)
      }
    }

    return (
      <Button onClick={handleClick} disabled={countdown > 0}>
        {countdown > 0 ? `${countdown}` + '秒后重新获取' : '获取验证码'}
      </Button>
    )
  }

  return (
    <>
      <a
        style={{
          float: 'right',
          marginRight: 16
        }}
        onClick={() => {
          setOpen(true)
        }}
      >
        忘记密码
      </a>
      <Modal
        title={'忘记密码'}
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
            label={'邮箱'}
            name="email"
            rules={[
              {
                required: true,
                message: '邮箱为必填项！'
              },
              {
                pattern:
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: '请输入正确的邮箱格式！'
              }
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            hasFeedback
            label={'账号'}
            name="userAccount"
            rules={[
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: '账号只能由字母和数字组成，不能包含特殊字符！'
              },
              {
                required: true, // 必须输入
                message: '账号为必填项！'
              },
              {
                min: 4,
                max: 20,
                message: '账号长度为4-20位！'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={'新密码'}
            name="userPassword"
            rules={[
              {
                required: true, // 必须输入
                message: '请输入密码！'
              },
              {
                min: 8,
                type: 'string',
                message: '密码不能小于8位！'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label={'验证码'}
            name="captcha"
            rules={[
              {
                required: true,
                message: '验证码为必填项！'
              },
              {
                min: 6,
                message: '验证码长度为6位！'
              }
            ]}
            hasFeedback
            extra={'我们必须验证你为本人操作！'}
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
