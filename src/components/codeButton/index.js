import React ,{Component ,Fragment} from "react"
import {Button, message} from "antd";
let timerOne = null

class CodeType extends Component{
    constructor(){
        super()
        this.state ={
            CodeButtonType: 0,
            userAccount:'',
            timer:60,//倒计时计时器
        }
    }

    //接受福组件传过来的值实时更新 性能由于this.props
    componentWillReceiveProps({userAccount}){
        this.setState({
            userAccount,
        })
    }

    //组件销毁的时候
    componentWillUnmount(){
        clearTimeout(timerOne)
    }

    //获取验证码
    getCode = ()=>{
        if (!this.state.userAccount.trim()) return message.error('请输入账号',1)
        this.setState({
            CodeButtonType:1
        })
     setTimeout(()=>{
            this.setState({
                CodeButtonType:2
            })
               timerOne = setInterval(() =>{
                let thisTime = this.state.timer - 1
                this.setState(
                    {
                        timer:thisTime
                    }
                )
                if (this.state.timer === 0){
                    this.clearTime(timerOne)
                }
            },1000)
        },1000)

    }

    //清楚定时器
    clearTime = (dom)=>{
        clearInterval(dom)
        this.setState({
            CodeButtonType:4,
            timer:60
        })
    }


    render() {
        let elemt = null
        switch(this.state.CodeButtonType){
            case 0:
                elemt =  <Button type="primary" danger block onClick={this.getCode}>
                    获取验证码
                </Button>
                break;
            case 1:
                elemt = <Button type="primary"  block loading danger >
                    发送中
                </Button>
                break;
            case 2:
                elemt = <Button type="primary"  block  danger >
                    {this.state.timer}S
                </Button>
                break;
            default :
                elemt = <Button type="primary" danger block onClick={this.getCode}  >
                    重新获取
                </Button>
                break
        }

        return (
            <Fragment>
                {elemt}
            </Fragment>
        );
    }
}

export default CodeType
