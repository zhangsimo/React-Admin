import React ,{Component ,Fragment} from 'react'
import {Switch , Tag} from 'antd'
import * as api from '@api/staff/staffList.js'
import TableComponent from '@c/tableData/index.js'
import SearchList from '@c/SearchList/index.js'
import {connect} from 'react-redux'
class userManagement extends Component{
     constructor(props){
         super(props)
         this.state = {
             shopList:[
                 {id:'-1', shortName:'全部'}
             ],//门店列表
             shopId:'-1',//获取到门店的id
             checkBoxState:false,//复选框状态
             TableConfing:{
                 columns: [
                     {
                         title: "姓名",
                         align: "center",
                         key: "userName",
                         dataIndex:'userName'
                     },
                     {
                         title: "手机号码",
                         align: "center",
                         key: "phone",
                         dataIndex:'phone',
                     },
                     {
                         title: "角色",
                         align: "left",
                         key: 'userRoles',
                         width: 200,
                         dataIndex:'userRoles',
                         render: userRoles=>(
                             <span>
                             {
                                 (userRoles || []).map(item => {
                                     let  color = item.systemType === 0 ? 'geekblue' : 'green'
                                     return <Tag  color={color} key={item.id}>
                                         {item.displayName}
                                     </Tag>
                                 })
                             }
                         </span>
                         )
                     },
                     {
                         title: "性别",
                         align: "center",
                         key: "gender",
                         dataIndex:'gender',
                         render: gender => (
                             <span>
                             {gender === 0? '男' : '女'}
                         </span>
                         )

                     },
                     {
                         title: "生日",
                         align: "center",
                         key: "birthDay",
                         dataIndex:'birthDay',
                     },
                     {
                         title:'是否开通账号',
                         align:'center',
                         key:'openSystem',
                         dataIndex:'openSystem',
                         render : (text, record) =>{
                             return <Switch
                                 defaultChecked={record.openSystem === 0? true : false}
                                 unCheckedChildren= '禁用'
                                 checkedChildren = '启用'
                                 onChange={()=>this.switchAccount(record)} />
                         }
                     },
                     {
                         title: "登录账号",
                         align: "center",
                         key: "loginName",
                         dataIndex:'loginName',
                     },
                 ],
                 api:api.getStaffList,//查询地址
                 rowSelection:'radio',// 是否有选择框值为radio或者checkbox
                 rowKey:'',//表格的key值默认id
             },
             queryList:{},//查询条件
             formList:[
                 {label:'门店' ,type:'select' , name:'shopId' ,style:{width:'150px'} ,list: [ {id:'-1', shortName:'全部'}]},
                 {label:'姓名' ,type:'input',name:'userName'},
                 // {label:'性别' ,type:'slot',slotName:'sex'},
                 {label:'手机号码' ,type:'input',name: 'phone'},
                 {label:'是否离职' ,type:'checkbox' , name: 'shopkeeper'},
             ], //表单列表 插槽使用具名插槽
             loadings:false , //按钮节流
         }
     }

     //门店下拉框
    handleChange = (value)=>{
        this.setState({
            shopId:value
        })
    }

    //复选框
    changeCheckBox = (checkedValues)=>{
        this.setState({
            checkBoxState:checkedValues.target.checked
        })
    }

    //获取当前门店
    getShopList = async () =>{
       let  res = await api.getLessee()
        if (res.code === 0){
            let arr = []
            arr =  arr.concat(this.state.formList)
            arr[0].list.push(...res.data)
            this.setState( {
                formList:arr
            })
        }
    }

    //切换员工状态
    switchAccount = (value) => {
        this.props.history.push({pathname:'/base/user/addUser' ,state:{id:value.id}})
    }
    //
    // //获取input框内容--利用name进去区分后统一拿值
    // getInputList = e =>{
    //      let obj = {}
    //         obj[e.target.name] = e.target.value
    //         this.setState(obj)
    // }



    //获取点击数据
    getSelectList = (val) => {
         console.log(val ,123)
    }

    query = (val) => {
        this.setState({
            queryList: val
        })
    }


    //生命周期中调用方法
    componentDidMount() {
        this.getShopList()
    }

    render() {
         return (
             <Fragment>
                 <SearchList FormItem={this.state.formList} >
                 </SearchList>
                 <TableComponent  TableConfing={this.state.TableConfing} getSelectList={this.getSelectList} />
             </Fragment>
         )
     }
}
const  mapStateToprops = (state)=>{
    return {
        list: state
    }
}
// const  mapDispatchToProps = ()=>{}
export default connect(
    mapStateToprops,
    null
)(userManagement)
