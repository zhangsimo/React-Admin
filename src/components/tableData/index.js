import React ,{Component ,Fragment} from 'react'
import PropTypes  from 'prop-types'
import TableType from './table.js'
import {connect} from 'react-redux'

class tableComponent  extends  Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],//表格数据
            userName:'',//输入框姓名
            phone:'',//输入框电话
            page:{
                size:10,
                page:1,
                total:1
            },//分页
            loadings:false,
            list:{}
        }
    }

    //初始化调用接口
    componentWillReceiveProps({queryList}){
        this.setState({
            list:queryList
        },()=>{
            this.query()
        })
    }



    // componentDidMount() {
    //     this.query()
    // }

    //查询当前列表
    query =  async ()=>{
        let data = {}
        if (this.state.list && Object.keys(this.state.list).length > 0) {
            for (let key in  this.state.list){
                data[key] = this.state.list[key] ? this.state.list[key] : ''
            }
        }
        console.log(data , 5555)
        data.size = this.state.page.size
        data.page = this.state.page.page - 1
        data.office = !data.shopkeeper ? 0 : 1
        data.groundIds =''
        data.tenantId = 117
        delete data.shopkeeper
            this.setState({
            loadings:true
        })
        try {
            let res = await this.props.TableConfing.api(data)
            if (res.code === 0) {
                let page = Object.assign({}, this.state.page, {total: res.data.totalElements})
                this.setState({
                    data: res.data.content,
                    loadings: false,
                    page,
                })
            }
        } catch(err){
            let page = Object.assign({}, this.state.page, {total: 0 ,})
            this.setState({
                data:[],
                loadings: false,
                page
            })
            }
    }

    //表格选取//向外传递参数
    tableSelect = (record, selected)=> {
        if (this.props.getSelectList){
            this.props.getSelectList(selected)
        }
    }

    //分页
    cancel = (page ,size)=>{
        if (size !== this.state.page.size){
            page = 1
        }
        let num = Object.assign(this.state.page ,{page:page,size:size})
        this.setState(
            {page:num},
            ()=>{
                this.query()
            }
        )
    }

    render() {
        const TableConfing = this.props.TableConfing,
              {data} = this.state
        return <Fragment>
            <TableType
                TableConfing = {TableConfing}
                dataList = {data}
                total={this.state.page.total}
                changCancel={this.cancel}
                getTableSelect={this.tableSelect}
                current = {this.state.page.page}
            >
            </TableType>
        </Fragment>
    }


}


//传参默认值
//     optionalArray: PropTypes.array,
//     optionalBool: PropTypes.bool,
//     optionalFunc: PropTypes.func,
//     optionalNumber: PropTypes.number,
//     optionalObject: PropTypes.object,
//     optionalString: PropTypes.string,
//     optionalSymbol: PropTypes.symbol,
//校验传参
tableComponent.propTypes = {
    TableConfing: PropTypes.object
}

//默认传参参数
tableComponent.defaultProps ={
    TableConfing : {}
}


// 获取react-redux的值
const mapStateToProps = (state) => {
    return {queryList: state.userReducer.searchList}
}

export default connect(
    mapStateToProps,
    null
    )(tableComponent)
