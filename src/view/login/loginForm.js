import React , {Component} from 'react'
import {Button, Col, Form, Input, Row } from "antd";
import './loginForm.scss'
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import CodeButton from '@c/codeButton/index.js'
import { withRouter } from 'react-router'
import {bindActionCreators} from "redux";
import {actionSetToken} from'@store/action/loginList'
import {setSessionStorage , setLoginName} from '../../utils/tool.js'
import {login , getUserInfo} from "@api/account";
import {connect} from "react-redux";


class LoginForm extends Component{
    constructor(){
        super()
        this.state = {
            userAccount:'',//当前账号
        }
    }

    //登录
    onFinish = async (values) => {
        let data ={}
            data.username = values.username
            data.password = values.Password
        let res =  await login(data)
        if (res.code === 0){
            this.props.actions.setToken(res.data.access_token)
            setLoginName(data.username)
            let list = await getUserInfo(values.username)
            if (list.code === 0){
                let arr = []
                list.data.resourceVOS.forEach( item => {
                    if (!item.name.includes('_')) {
                        arr.push(item)
                    }
                })
                list.data.routerList = arr
                setSessionStorage(list.data)
                this.props.history.push('/base/home')
                sessionStorage.path='/base/home';
                let lists=[{key:'/base/home',title:'首页'}]
              
                this.props.dian(lists[0])
             

            }
        }
    }

    //注册账号
    toggleForm = () =>{
        this.props.triggetTab('register')
    }

    //获取当前输入账号
    getUser = (e) => {
         this.setState({
             userAccount: e.target.value
         })
    }

    render() {
        return (
            <div className='login'>
                <div className='box'>
                    <div className='loginBox clearfix mt10'>
                        <span className='fl fnt18'>登录</span>
                        <span className='fr finger'  onClick={this.toggleForm}>注册账号</span>
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
                            rules={[
                                {required: true, message: '请输入账号'},
                                // {type:'email' ,message:'请输入邮箱账号'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={this.getUser} placeholder="账号" />
                        </Form.Item>
                        <Form.Item
                            name="Password"
                            rules={[
                                {required: true, message: '请输入密码',},
                                // {pattern:validate_passWord , message:'密码为中文加字母'},

                            ]}
                        >
                            <Input type='password' autoComplete="current-password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules ={[
                                {required: true, message: '请输入验证码',}
                            ]}

                        >
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span={8}>
                                    <CodeButton userAccount={this.state.userAccount}></CodeButton>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

//获取redux内的值
// const mapStateToProps = (state) => ({
//         list: state
// })

//修改redux内的值
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            setToken: actionSetToken
        },dispatch),
        dian(item){
            dispatch({type:'TIAO',obj:item})
        }
        }

}


export default connect(
    null,
    mapDispatchToProps
)(withRouter(LoginForm))

