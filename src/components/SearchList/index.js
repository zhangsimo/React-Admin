import React ,{Component ,} from 'react'
import { Form, Input ,Button , Select , Checkbox} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes  from 'prop-types'
import {connect} from 'react-redux'
class  searchList  extends  Component{
    constructor(props) {
        super(props)
        this.state = {
            FormItem: []
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if (nextProps.FormItem){
    //         this.setState({
    //             FormItem:nextProps.FormItem
    //         })
    //     }

    // }
    initFormItem = () => {
        let FormItem = this.state.FormItem.length > 0 ?  this.state.FormItem :this.props.FormItem
        if (!FormItem || (FormItem && FormItem.length === 0) ) return false
            let elemt = []
          FormItem.forEach( item => {
            switch (item.type) {
                case 'select':
                    elemt.push(this.setSelect(item))
                    break;
                case 'input':
                    elemt.push(this.setInput(item))
                    break;
                case 'checkbox':
                    elemt.push(this.setCheckebox(item))
                    break;
                case 'slot':
                    elemt.push(this.setSlot(item))
                    break;
                default:
                    break

            }
        })
        return elemt
    }
    //类型为Input
    setInput = (item) => {
       return ( <Form.Item label={item.label} colon name={item.name} key = {item.name}>
            <Input/>
        </Form.Item>
       )
    }

    //具名插槽
    setSlot = (item) => {
        return (
            <Form.Item label={item.label} colon name={item.name} key = {item.slotName}>
                {this.props.children && Array.isArray(this.props.children) ? this.props.children.filter( ele =>  ele.ref === item.slotName) : this.props.children}
            </Form.Item>
        )
    }

    //类型为select
    setSelect = (item) => {
        return (
            <Form.Item label={item.label} colon name={item.name} key = {item.name}>
                <Select style={item.style} >
                    {item.list && item.list.map( val => {
                        return <Select.Option value={val.id} key={val.id}>{val.shortName}</Select.Option>
                    })}
                </Select>
            </Form.Item>
        )
    }

    //类型为checkbox
    setCheckebox = (item) => {
        return (
                <Form.Item  name={item.name} valuePropName="checked" noStyle key = {item.name}>
                    <Checkbox>{item.label}</Checkbox>
                </Form.Item>
        )
    }


    //查询返回值
     onFinish = (values)=>{
        this.props.search(values)
    }

    componentDidMount() {
        this.props.search(this.refs.formRef.getFieldsValue())
    }


    render() {
        return (
            <div style={{padding:'15px 10px'}}>
                <Form
                    layout='inline'
                    size= 'small'
                    ref='formRef'
                    onFinish={this.onFinish}
                    initialValues={{shopId:'-1' , shopkeeper:false}}
                >
                    {this.initFormItem()}
                  <Form.Item>
                      <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
                          查询
                      </Button>
                  </Form.Item>
                </Form>
            </div>
        )
    }

}

searchList.propTypes = {
    FormItem: PropTypes.array
}

//默认传参参数
searchList.defaultProps ={
    FormItem : []
}

//获取redux内的值
// const mapStateToProps = (state) => ({
//         list: state
// })

//修改redux内的值
const mapDispatchToProps = (dispatch) => {
    return {
       search: (value)=>{
           dispatch({
               type:'GET_SEARCH_LIST',
               list:value
           })
       }
    }
}


export default connect(
    null,
    mapDispatchToProps
)(searchList)
