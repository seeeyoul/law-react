import React,{PureComponent} from 'react';
import {connect} from "react-redux";
import {Table} from "antd";

const columns = [
    {
        title:'争议焦点',
        key:'item',
        dataIndex:'item'
    },
    {
        title:'可信度',
        key:'probability',
        dataIndex:'probability'
    }
];
class ArguePoint extends PureComponent{
    render() {
        const {res,csv} = this.props;
        let data;
        if (!csv && res) {
            data = res[0];
        }
        return (
            <div className='row-spacebetween-start'>
                <div className='left'>
                    <label>争议焦点</label>
                </div>
                <div className='column-center-start right'>
                    <Table
                        pagination={false}
                        style={{width:'calc(100vw - 556px)'}}
                        columns={columns}
                        dataSource={res && !csv && data ? data[0].result:[]}
                    />
                    <div style={{
                        width:'calc(100vw - 556px)',
                        minHeight:'200px',
                        marginTop:'20px',
                        padding:'10px',
                        background:'#fafafa',
                        border:'1px dashed #d9d9d9'
                    }}>
                        {res && !csv && data && data[0].result1}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        res: state.getIn(["Input","data"]),
        csv: state.getIn(["Input","csv"])
    }),null
)(ArguePoint);
