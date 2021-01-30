import React ,{Component, Fragment}from 'react'
import { Tooltip} from 'antd';
import {
    ExpandOutlined,
    CompressOutlined
} from '@ant-design/icons';

class fullscreen  extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:false
        }
    }

    //提示框手动触发
    handleMouseOver =()=>{
        this.setState({
            visible: !this.state.visible
        })
    }

    //鼠标离开提示框关闭
    handleMouseOut =()=> {
        this.setState({
            visible: !this.state.visible
        })
    }



    //监听目前窗口状态
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    //保证放大缩小图形不会被esc F11影响图形问题
    handleResize = e => {
        let heigh = window.screen.height
        if (heigh > e.target.innerHeight){
            this.setState({
                screenFullType: false
            })
        }
        this.setState({
            visible:false
        })
    }


//切换窗口大小
    changeFull = () => {
        let main = document.body
        if (this.state.screenFullType) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        } else {
            if (main.requestFullscreen) {
                main.requestFullscreen()
            } else if (main.mozRequestFullScreen) {
                main.mozRequestFullScreen()
            } else if (main.webkitRequestFullScreen) {
                main.webkitRequestFullScreen()
            } else if (main.msRequestFullscreen) {
                main.msRequestFullscreen()
            }
        }
        this.setState({
            screenFullType: !this.state.screenFullType
        })
    }

    render() {
        return <Fragment>
            <Tooltip
                destroyTooltipOnHide
                placement="bottom"
                visible={this.state.visible}
                title= {this.state.screenFullType ? '退出全屏' : '全屏'}

            >
                {
                    React.createElement( this.state.screenFullType ? CompressOutlined :ExpandOutlined , {
                        className:'finger fnt18 mr10 loginUser',
                        onClick: this.changeFull,
                        onMouseLeave: this.handleMouseOver,
                        onMouseEnter: this.handleMouseOut,
                        position:'static',
                    })
                }
            </Tooltip>
        </Fragment>

    }
}

export default fullscreen
