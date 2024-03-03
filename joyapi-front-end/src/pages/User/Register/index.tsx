import {
  getCaptchaUsingGet,
  userRegisterUsingPost
} from '@/services/joy-admin/userController'
import { history } from '@umijs/max'
import 'animate.css'
import { Button, Card, Col, Form, Image, Input, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
// div样式
const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: `url('https://upload.ojason.top/hexo/background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}
// Card样式
const cardStyle = {
  width: 400,
  margin: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.8)'
  // 浮动出现动画
}

const Register: React.FC = () => {
  const handleCancel = async () => {
    await history.push('/user/login')
  }
  // 验证码是否正确
  const [captchaCorrect, setCaptchaCorrect] = useState(true)
  const Captcha = React.forwardRef(() => {
    const [captchaSrc, setCaptchaSrc] = useState('')
    const handleGetCaptcha = async () => {
      try {
        const response = await getCaptchaUsingGet({
          responseType: 'blob'
        })
        // 将图片流转换为blob对象
        const blob = new Blob([response], { type: 'image/png' })
        // 将blob对象转换为dataURL
        const src = URL.createObjectURL(blob)
        setCaptchaSrc(src)
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
      .then(async (values: API.UserRegisterRequest) => {
        // submit(values);
        console.log(values)
        // 校验
        const { userAccount, userPassword, checkPassword, code } = values
        if (!userAccount || !userPassword || !checkPassword || !code) {
          message.error('请填写完整信息！')
          return
        }
        try {
          // 注册
          const res = await userRegisterUsingPost(values)
          if (res.code === 200) {
            // 注册成功
            message.success('注册成功，3s后跳转到登录页！', 3, () => {
              // 跳转到登录页面
              handleCancel()
            })
            setCaptchaCorrect(true)
            form.resetFields()
          } else {
            message.error(res.message)
            setCaptchaCorrect(false)
          }
        } catch (error) {
          console.log(error)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
  // 组件挂载时获取验证码,当captchaCorrect为false时，重新获取验证码
  useEffect(() => {
    if (!captchaCorrect) {
      setCaptchaCorrect(true)
      captchaRef.current?.handleGetCaptcha()
    }
  }, [captchaCorrect])

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 }
  }

  // Card组件的title,居中
  const title = (
    <div
      style={{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
      }}
    >
      <h2>注册</h2>
    </div>
  )

  return (
    <div style={{ ...divStyle }}>
      <Card
        style={{ ...cardStyle }}
        title={title}
        className="animate__animated animate__bounce"
      >
        <Form
          {...formItemLayout}
          form={form} // 绑定form，以根据form的值更新UI
          name="register"
          initialValues={{
            prefix: '86'
          }}
          scrollToFirstError
          onFinish={handleOk}
        >
          <Form.Item
            name="userAccount"
            label={'用户名'}
            rules={[
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: '用户名只能包含字母和数字！'
              },
              {
                required: true, // 必须输入
                message: '请输入用户名！'
              },
              {
                min: 4,
                max: 20,
                message: '用户名长度应在4-20之间！'
              }
            ]}
            hasFeedback
          >
            {/* 这个Form.Item包裹一个Input组件 */}
            <Input />
          </Form.Item>
          <Form.Item
            name="userPassword"
            label={'密码'}
            rules={[
              {
                required: true, // 必须输入
                message: '请输入密码！'
              },
              {
                min: 8,
                type: 'string',
                message: '密码不能小于8位！'
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
            label={'确认密码'}
            rules={[
              {
                required: true, // 必须输入
                message: '请输入密码'
              },
              ({ getFieldValue }) => ({
                // ((form: FormInstance) => RuleConfig);  function动态获取form数据。
                // Validator： (rule, value) => Promise
                validator(rule, value) {
                  if (!value || getFieldValue('userPassword') === value) {
                    return Promise.resolve() // 如果没输入confirm，或者confirm和password一致，就返回一个fulfilled的promise
                  }

                  return Promise.reject('两次输入的密码不一致') // 否则返回一个rejected的promise，并带上错误信息。
                }
              })
            ]}
            hasFeedback // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
          >
            {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="code"
            label={'验证码'}
            extra={'We must make sure that your are a human.'}
            rules={[
              {
                required: true,
                message: '请输入验证码！'
              }
            ]}
          >
            <Row gutter={20}>
              {/* gutter 的单位是像素 */}
              {/* Row被划分为24格，用Col与Span属性设定宽度 */}
              <Col span={14}>
                <Form.Item name="code" noStyle>
                  <Input maxLength={4} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Captcha ref={captchaRef}></Captcha>
              </Col>
            </Row>
          </Form.Item>
          {/* 提交按钮 */}
          <Button
            type="primary"
            onClick={handleOk}
            style={{
              width: '100%',
              height: 40,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            注册
          </Button>
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <a onClick={() => history.push('/user/login')}>已有账号？去登录</a>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register
