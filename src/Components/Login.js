import React from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import '@/Style/login.scss';
import fetch from "@/Api";

const { login: loginIn, getEnterprise } = fetch;
const { Option } = Select;

function Login() {
  const { loading: logLoading, run: loginRequest } = useRequest(loginIn, { manual: true });
  const { run: getEnterRun } = useRequest(getEnterprise, { manual: true });
  const history = useHistory();

  const onFinish = async values => { // 登录
    const { nationCode, password, username } = values;
    let enterpriseId;
    await getEnterRun({ phoneNumber: username }).then(res => { // 根据用户名搜索企业
      enterpriseId = res.result?.[0]?.enterpriseId;
    })
    let params = {
      phoneNumber: username,
      password,
      nationCode,
      enterpriseId
    }
    loginRequest(params).then(_ => {
      message.success('登录成功');
      history.push('/user-list/user-list');
    })
  };

  return (
    <div className='loginBox'>
      <header className='loginHeader'>
        <div className="headerContent">
          <img src='assets/logo-login.png' alt='demo' />
        </div>
      </header>

      <div className='loginBody'>
        <div className="loginBodyContent" style={{ backgroundImage: 'url(assets/login-bg.png)' }}>
          <div className='loginInput'>
            <p>GIC商户后台登录</p>
            <Form
              name="basic"
              initialValues={{ nationCode: '+86', username: 'damogic', password: 'damo2019' }} // 测试环境管理员账号
              onFinish={onFinish}>

              <Row>
                <Col span={6}>
                  <Form.Item
                    name="nationCode">
                    <Select style={{ width: 80, height: 45 }}>
                      <Option value="+86">+86</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" style={{ height: 45, width: 244, marginLeft: '-2px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} style={{ height: 45 }} placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ height: 45, width: '100%' }} loading={logLoading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <footer>Copyright 2019 Demogic.com All Rights Reserved 浙ICP备15033117号-1</footer>
    </div>
  )
}

export default Login