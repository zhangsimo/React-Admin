import React ,{Component ,Fragment} from 'react'
import {Table,Pagination , Row ,Col} from 'antd'
import PropTypes  from 'prop-types'
import {connect} from  'react-redux'

class TableType extends Component {


    render() {
        const {TableConfing , dataList , total , changCancel , getTableSelect ,current} = this.props,
            {columns} = TableConfing,
              rowSelection = TableConfing.rowSelection ? {
            type:TableConfing.rowSelection ,
            columnTitle: TableConfing.rowSelection === 'radio' ? '选择' : null,
            onChange:getTableSelect
        } : null

        return (
            <Fragment>
                <Table
                 rowKey= {TableConfing.rowKey || 'id'}
                 columns={columns}
                 dataSource={dataList}
                 size='small'
                 rowSelection={rowSelection}
                 pagination= {false}
                 bordered/>
                <Row className='mt10'>
                    <Col span={24}>
                        <Pagination className='fr mr10'
                                    showQuickJumper
                                    current={current}
                                    showSizeChanger
                                    showTotal =  {() => `共${total}条`}
                                    total={total}
                                    onChange={changCancel}
                        />
                    </Col>
                </Row>
        </Fragment>
        )
    }
}
//校验传参
TableType.propTypes = {
    TableConfing: PropTypes.object,
    dataList: PropTypes.array,
    total:PropTypes.number,
    changCancel:PropTypes.func,
    getTableSelect:PropTypes.func,
}

//默认传参参数
TableType.defaultProps ={
    TableConfing : {},
    dataList:[],
    total:0
}
//获取redux内的值
const mapStateToProps = (state) => {
    if (!state.userReducer.searchList) return {}
    return {
        list: state.userReducer.searchList
    }
}
export default connect(
    mapStateToProps,
    null
)(TableType)
