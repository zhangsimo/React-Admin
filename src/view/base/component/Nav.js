
import { connect } from 'react-redux'
import {Button, Menu, Dropdown}from "antd";
import store from "../../../store/index";
import { withRouter } from 'react-router';

import React, { Component } from 'react';
import {
    CloseCircleOutlined 
  } from '@ant-design/icons';
  
import "./nav.css";

export class Nav extends Component {
    state={
        flag:true,
        num:0,
        num1:0
       
    }
   menu = (
        <Menu>
          <Menu.Item >
          <p onClick={()=>{
             this.setState({});
        this.props.history.push('/base/home') 
            this.props.closeAll() 
         
         }}>关闭所有</p>  
          </Menu.Item>
          <Menu.Item >
          <p onClick={()=>{
              let path=sessionStorage.path 
              this.props.closeOther(path)
          this.setState({});
             
         }}>关闭其他</p> 
          </Menu.Item>
         
        </Menu>
      );
      leftBtn(){
        let num=this.state.num
        this.setState({
            num:num+1
        })
        let con=document.querySelector('.con');
        let nav=document.querySelector('.nav');
       let www=con.scrollWidth;
       let elements=con.offsetLeft;
       //获取子元素到父元素的距离
       let rightWidth=nav.offsetWidth-con.offsetWidth-elements
       if(www>1550){
         if(rightWidth<20){
             this.setState({
                 num:0
             })
             return
         }
          con.style.marginLeft = `${this.state.num*30}px`;
        }else{
            this.setState({})
        }
    
    }
      rightBtn(){
        let num=this.state.num1
        this.setState({
            num1:num+1
        })
        let con=document.querySelector('.con');
      
        var www=con.scrollWidth
        var element=con.offsetLeft;
        let nav=document.querySelector('.nav');
        let rightWidth=nav.offsetWidth-www-element
       
        if(rightWidth>60){
            this.setState({
                num1:0
            })
            return
        }
      if(www>1550){
      if(element<-120){
         this.setState({
             num1:0
         })
         return
     }
      con.style.marginLeft = `-${this.state.num1*30}px`;
     
       }else{
           this.setState({})
       }
      }
    render() {
    
        let {dian,close}=this.props
            let {activityKey}=this.props.nav
            let  list=activityKey
            store.subscribe(()=>{
                  
                     list=activityKey

            })
             
 
        return (
                <div className="nav" ref={'nav'}>
                <span id="left" style={{top:list.length===0?"2px":"-25px"}}>
                <Button  onClick={()=>{
                      
                       this.leftBtn()
                }}>&lt;</Button></span>
                <div className="con">
                {   list.length>0?
                    list.length>0&&list.map((item,i)=>{
                      return  <div className="list" key={i} style={{background:(item.key===sessionStorage.path)?"rgb(245, 103, 9)":"#fff",color:(item.key===sessionStorage.path)?"#fff":""}}><span  className="span"  color="magenta"  onClick={()=>{
                          sessionStorage.path=item.key
                           this.tiao(item.key)
                           dian(item)
                        }}>{item.title}</span>{item.title!=='首页'?<b className="b" onClick={()=>{
                            let con=document.querySelector('.con');
                            let www=con.scrollWidth;
                           
                            if(www<1700){
                                con.style.marginLeft = '0';
                                this.setState({
                                    num1:0
                                })
                            }
                            if(list.length>1){
                               list.forEach((e,i)=>{
                               if(e.title===item.title){
                                   if(i!==0){
                                      
                                        this.props.history.push(list[i-1].key)  
                                        sessionStorage.path=list[i-1].key
                                        close(list[i])
                                        
                                   }else{
                                    sessionStorage.path=list[i+1].key
                                       this.props.history.push(list[i+1].key)
                                       close(list[i])
                                   }
                                }
                            })
                          
                          }else if(list.length===1){
                            
                             // sessionStorage.path='/base/home'
                              this.props.history.push('/base/home') 
                                close(list[0])
                           } else{
                          //  sessionStorage.path='/base/home'
                           this.props.history.push('/base/home') 
                        }
                             
                       }}>×</b>:<></>}
                            
                        </div>
                     
                     })
                     :<div></div>
                }
                </div>
                <span className="Right"> <Button id="right" onClick={()=>{
                       this.rightBtn()
                     
                }}>&gt;</Button>
         <Dropdown overlay={this.menu} placement="topRight" arrow style={{width:'200px'}} trigger={['click']} onVisibleChange={(v)=>{
           
         }}>
      <Button className="btn"><CloseCircleOutlined/>
        
       
    
    </Button>
      
    </Dropdown>
    
    </span>
               
           </div>
        )
    }
    tiao(item){
        this.props.history.push(item)
        
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        dian(item){
          
            dispatch({type:'TIAO',obj:item})
        },
        close(item){
            dispatch({type:'DEL',obj:item})
        },
        closeAll(){
            dispatch({type:'CLOSE'})
        },
        closeOther(path){
            dispatch({type:'CLOSE_O',path:path})     
        }


    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))


