import React ,{Component , Fragment} from 'react'
import {Menu} from "antd";
import { withRouter } from 'react-router'
import router from '@router/router.js'
import {Link} from 'react-router-dom'
import iconMap from '@/utils/iconMap.jsx'
import {getSessionStorage} from '@/utils/tool.js'
import { connect } from 'react-redux'
const { SubMenu } = Menu;

class aside extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedKeys:[],
            openKeys:[]
        }
    }

    //多级菜单调用 //判断权限是否可以用
    renderSubMenu = ({title , key , child ,  icon ,mark })=>{
        const roltList = getSessionStorage().routerList
        if (mark && !roltList.find(item =>item.name === mark)) return
        return <SubMenu key={key} title={title} icon={iconMap[icon]}>
            {
                child && child.map( item => {
                    return  item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                })
            }
        </SubMenu>
    }

    //一级菜单 //判断权限是否可以用
    renderMenu = ({title , key , icon ,mark}) => {
        const roltList = getSessionStorage().routerList
        if (mark && !roltList.find(item =>item.name === mark)) return
        return (<Menu.Item key={key} icon={iconMap[icon]}>
            <Link to={key} onClick={()=>{
                sessionStorage.path=key
                this.props.tiao({title,key})

            }}>{title}</Link>
        </Menu.Item>)
    }

    componentDidMount() {
        const pathName = this.props.location.pathname
        this.setState({
            selectedKeys:[pathName]
        })
        if (pathName.split('/').length > 2){
            this.setState({
                openKeys:[pathName.split('/').slice(0 , pathName.split('/').length - 1 ).join('/')]
            })
        }
    }

    /**
     * 点击选中菜单
     **/
    selectMun = ({ item, key, keyPath, domEvent })=>{
        this.setState({
            selectedKeys:[key],
            openKeys:[keyPath[keyPath.length - 1]]
        })

    }
    /**
     * 打开第一层
     * **/
    openOneLv = (openKeys) =>{
        if (openKeys.length > 0){
            this.setState({
                openKeys:[openKeys[openKeys.length - 1]]
            })
        }else{
            this.setState({
                openKeys:[]
            })
        }
    }


    render() {
        const {openKeys , selectedKeys} = this.state
        this.props.history.listen((route) => {
            const pathName = route.pathname
            this.setState({
                selectedKeys:[pathName]
            })
            if (pathName.split('/').length > 2){
                this.setState({
                    openKeys:[pathName.split('/').slice(0 , pathName.split('/').length - 1 ).join('/')]
                })
            }
        })
        return(
            <Fragment>
                <Menu
                    onOpenChange={ this.openOneLv}
                    onClick={ this.selectMun}
                    theme="dark"
                    mode="inline"
                    openKeys = {openKeys}
                    selectedKeys = {selectedKeys}
                >
                    {
                        router && router.map( firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }

                </Menu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        tiao(v){
            dispatch({type:'TIAO',obj:v})
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(aside))




