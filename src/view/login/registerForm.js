import React ,{Component} from 'react'
import {Button, Col, Form, Input, Row} from "antd";
import './loginForm.scss'
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import CodeButton from '@/components/codeButton/index.js'


class RegisterForm extends  Component{
    constructor(){
        super()
        this.state={
            userAccount:'',//当前账号
        }
    }
    onFinish = (values) => {
        console.log(values);
    }

    //注册
    useIn =() => {
        this.props.triggetTab('login')
    }

    //获取当前账户
    getUserAcctions(e){
        this.setState({
            userAccount:e.target.value
        })
    }

    render() {
        return (
            <div className='login '>
                <div className='box register'>
                    <div className='loginBox clearfix mt10'>
                        <span className='fl  fnt18'>注册账号</span>
                        <span className='fr finger' onClick={this.useIn}>登录</span>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        //可以用来传参
                        // onFinish={() =>this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your Username!',},]}
                        >
                            <Input onChange={this.getUserAcctions.bind(this)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="Password"
                            rules={[{required: true, message: 'Please input your Password!',},]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="Passwords"
                            rules={[{required: true, message: 'Please input your Password!',},]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Passwords" />
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Col>
                                <Col span={8}>
                                    <CodeButton userAccount={this.state.userAccount}></CodeButton>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

}


export default RegisterForm
