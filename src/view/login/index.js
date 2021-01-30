import React ,{Component , Fragment} from 'react'
import LoginForm from './loginForm.js'
import RegisterForm from  './registerForm.js'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            showForm:'login'
        }
        this.triggerTab = this.triggerTab.bind(this)
        // //构造器内声明
        // this.onFinish = this.onFinish.bind(this)
    }

    // //构造器内声明
    // onFinish(){
    //     console.log(123)
    // }
    //箭头函数 使用时候this.onFinish
    //  onFinish = (values) => {
    //     console.log(123);
    // }
     //切换登录跟注册账号
    triggerTab = (value) => {
            this.setState(
                {
                    showForm: value
                }
            )
    }



    render() {
        return (
            <Fragment>
                {
                    this.state.showForm === 'login' ?
                        <LoginForm triggetTab={this.triggerTab}></LoginForm> :
                        <RegisterForm triggetTab={this.triggerTab}></RegisterForm>

                }
            </Fragment>
        )
    }

}

export default Login
