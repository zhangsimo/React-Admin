import React ,{Component ,Fragment} from 'react'
import { Avatar ,Popover} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import {romveToken , removeSessionStorage , getLoginName} from '@/utils/tool.js'

class loginUser extends  Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    changePassWord =() => {
        console.log('修改密码')
    }

    quit = () => {
        sessionStorage.path='';
        romveToken()
        removeSessionStorage()
        this.props.history.push('/')
        this.props.block()
    }

    render() {
        let list = <ul style={{textAlign:'center'}} >
            <li className='finger changeUserType' onClick={this.changePassWord}>修改密码</li>
            <li className='finger changeUserType' onClick={this.quit}>退出</li>
        </ul>

        return <Fragment>
            <Popover content={list}>
            <Avatar className='loginUser finger' size="small" icon={<UserOutlined />} />
            </Popover>
            <span className='ml10'>{getLoginName() ? getLoginName() : '角色名' }</span>
        </Fragment>
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
       block(){
        dispatch({type:'BLOCK'})
       }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(loginUser))

