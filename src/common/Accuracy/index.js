import React from "react";
import {connect} from "react-redux";
import {Table} from "antd";

const columns = [
    {
        title:'焦点',
        key:'焦点',
        dataIndex:'焦点'
    },
    {
        title:'真实焦点数',
        key:'真实焦点数',
        dataIndex:'真实焦点数'
    },
    {
        title:'预测焦点数',
        key:'预测焦点数',
        dataIndex:'预测焦点数'
    },
    {
        title:'焦点覆盖数',
        key:'焦点覆盖数',
        dataIndex:'焦点覆盖数'
    },
    {
        title:'焦点覆盖数/真实焦点数',
        key:'焦点覆盖数/真实焦点数',
        dataIndex:'焦点覆盖数/真实焦点数'
    },
    {
        title:'焦点覆盖数/预测焦点数',
        key:'焦点覆盖数/预测焦点数',
        dataIndex:'焦点覆盖数/预测焦点数'
    },
    {
        title: 'F1-Measure',
        key: 'F1-Measure',
        dataIndex: 'F1-Measure'
    }
];
const dataSource = [];
const Accuracy = props => {
    const {csv,csvData} = props;

    return (
        <div className='row-spacebetween-start'>
            <div className='left'>
                <label>准确率</label>
            </div>
            <div className='right'>
                <Table
                    pagination={false}
                    style={{width:'calc(100vw - 556px)'}}
                    columns={columns}
                    dataSource={csv && csvData ? csvData : dataSource } />
            </div>
        </div>
    )
};

export default connect(
    state => ({
        csv: state.getIn(["Input","csv"]),
        csvData: state.getIn(["Input","data"])
    }),
    null
)(Accuracy);
