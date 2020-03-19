import React, {useState} from "react";
import { Upload, Icon, message, List } from 'antd';
import { connect } from "react-redux";
import {url} from "../../../utils/net";

const { Dragger } = Upload;

const BlackboxAbstractExtraction = props => {
    const { ip } = props;
    const net = process.env.NODE_ENV === 'production' ? ip : url;
    const $props = {
        name: 'myfile',
        multiple: false,
        action: `${net}:5000/referee/file_upload`,
    };
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const onChange = info => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            const res = info.file.response.data;
            let _left=[],_right = [];
            res.原告陈述.forEach((el,i) => _left.push(i+1 + '. ' + el.item));
            res.被告辩诉.forEach((el,i) => _right.push(i+1 + '. ' + el.item));
            setLeft(_left);
            setRight(_right);
            message.success(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
    };

    return (
        <>
            <div className="column-center-start" style={{width: "100%", padding:30}}>
                <Dragger {...$props} onChange={onChange} style={{minWidth: 360}}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                </Dragger>,
                <div className="row" style={{width: "100%"}}>
                    <List
                        header={<div>原告陈述:</div>}
                        bordered
                        dataSource={left}
                        style={{margin:20}}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                    <List
                        header={<div>被告辩诉:</div>}
                        bordered
                        dataSource={right}
                        style={{margin:20}}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </>
    )
};

export default connect(
    state => ({
        ip: state.getIn(["Global", "ip"])
    }),
    null
)(BlackboxAbstractExtraction);
