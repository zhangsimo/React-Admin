import React,{Component , Fragment} from 'react'
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import './index.scss'
import SideMenu from './component/side-menu.js'
import ContainerMain from './component/container-main'
import Fullscreen from './component/fullscreen.js'
import LoginUser from './component/loginUser';
import Nav from "./component/Nav"
const { Header, Sider, Content } = Layout;


class base extends Component{
    constructor(){
        super()
        this.state ={
            collapsed: false, //导航栏切换状态
            screenFullType: false,//放大缩小状态

        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };



    render() {
        return <Fragment>
            <Layout style={{height: '100%'}}>
                <Sider className='siderType' trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        {
                        this.state.collapsed  ?   <h1 >DS</h1> : <h1 >电商管理系统</h1>
                        }

                    </div>
                    <SideMenu></SideMenu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background layout-header" >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger fnt24 loginUser',
                            onClick: this.toggle,
                        })}
                        <div className='fr'>
                            <Fullscreen/>
                            <LoginUser/>
                        </div>
                    </Header>
                    <Nav></Nav>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px  0px 16px ' ,
                            height: '400px',
                            boxSizing:"border-box",
                        }}
                    >
                        <ContainerMain/>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }
}

export default base
