import React,{PureComponent} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import qs from "qs";
import {Upload, Icon, message, Button, Input, Radio} from "antd";
import {actionCreators} from "./store";
import {url} from "../../utils/net";

const {Dragger} = Upload;


class InputPart extends PureComponent{
    constructor(props){
        super(props);
        this.total = true;
    }
    state = {
        flag: false,
        data: "",
        left: "",
        right: "",
        plainOptions: [
            "全部",
            "感情破裂",
            "抚养问题",
            "共同财产",
        ]
    };
    //手动输入文本提交
    handleGetDecision(){
        this.props.closeCSV();
        const data = {
                id: this.caseID.state.value,
                original_complaint: this.original_complaint.value,
                defendant_pleaded: this.defendant_pleaded.value,
                threadhold: this.props.threadhold,
                case_type: this.props.case_type,
            },
            req_header = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        //axios.post('http://49.235.20.228:9090/get_decision',qs.stringify(data),req_header)
        axios.post(this.props.ip+':5000/get_decision',qs.stringify(data),req_header)
            .then(res => {
                if (res.data.code === 200) {
                    message.success("提交成功.");
                    let $res = res.data.data, $plainOptions = [];
                    !this.props.csv && $res[1].forEach(el => {
                        $plainOptions.push(el.item);
                    });
                    $plainOptions.unshift("全部");
                    this.setState({
                        flag: false,
                        selectPoint:"",
                        data: $res[0],
                        left: $res[0].原告诉称,
                        right: $res[0].被告辩称,
                        plainOptions: $plainOptions
                    });
                    this.props.setRes($res);
                } else {
                    message.error("提交失败.");
                }
            })
    }
    onChange(info) {
        const { status } = info.file;
        if (info.file.type === "application/vnd.ms-excel") {
            this.props.setCSV()
        } else {
            this.props.closeCSV();
        }
        if (status !== 'uploading') {
            if (info.fileList[0]) {
                if (info.fileList[0].response !== undefined) {
                    let res;
                    res = info.fileList[0].response.data;
                    this.props.setRes(res);
                    let $res = res, $plainOptions = [];
                    !this.props.csv && $res[1].forEach(el => {
                        $plainOptions.push(el.item);
                    });
                    $plainOptions.unshift("全部");
                    this.setState({
                        flag: false,
                        selectPoint:"",
                        data: res[0],
                        left: res[0].原告诉称,
                        right: res[0].被告辩称,
                        plainOptions: $plainOptions
                    });
                } else  {
                    message.error("未知错误")
                }
            }
        }
        if (status === 'done') {
            message.success(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败.`);
        }
    }
    pointChange(e) {
        let res = this.props.res,
            _selectPoint = res[1];
        let leftRegs = [],
            rightRegs = [];
        _selectPoint.forEach(val => {
            if (e.target.value === val.item) {
                let left = val.原告诉称;
                let right = val.被告辩称;
                left.forEach(val => {
                    leftRegs.push(val);
                });
                right.forEach(val => {
                    rightRegs.push(val);
                });
            }
        });
        let _left = this.state.data[0].原告诉称,
            _right = this.state.data[0].被告辩称;
        for (let i = 0; i < leftRegs.length; i++) {
            _left = _left.replace(leftRegs[i], `<span style="color: red">${leftRegs[i]}</span>`);
            this.total = false
        }
        for (let i = 0; i < rightRegs.length; i++) {
            _right = _right.replace(rightRegs[i], `<span style="color:red">${rightRegs[i]}</span>`);
            this.total = false
        }
        if (!this.total) {
            if (e.target.value === "全部") {
                this.total = true
           }
        }
        this.setState({
            right: _right,
            left: _left,
        })
    }
    render() {
        const {upload,res,csv,ip} = this.props;
        const net = process.env.NODE_ENV === 'production' ? ip : url;
        const info = {
            name: 'myfile',
            data:{"threadhold":this.props.threadhold,"case_type":this.props.case_type},
            multiple: false,
            action: `${net}:5000/file_upload`,
        };
        const style = {
            width: "45%",
            padding: 20,
            height: 300,
            overflowY: "scroll",
            border: "1px solid #efefef"
        };
        return(
            <div className='row-spacebetween-start' style={{margin:"0 0  20px 0"}}>
                <div className='left'>
                    <label>输入部分</label>
                </div>
                <div className='column-spacearound right'>
                    <Dragger {...info} onChange={this.onChange.bind(this)}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或拖拽文件上传</p>
                        <p className="ant-upload-hint">
                            支持文件格式:仅限docx,csv,txt
                        </p>
                    </Dragger>
                    <div className='row-spacebetween-center'>
                        <div
                            style={!this.total ? style : {}}
                        >
                            {
                                this.total ?
                                    <textarea
                                        ref={textarea => {
                                            this.original_complaint = textarea
                                        }}
                                        placeholder={upload && res !== undefined && !csv && this.state.data ? this.state.data[0].原告诉称 : this.props.test_0}
                                    />
                                    :
                                    <div dangerouslySetInnerHTML={{__html:this.state.left}}/>
                            }
                        </div>
                        <div
                            style={!this.total ? style : {}}
                        >
                            {
                                this.total ?
                                    <textarea
                                        ref={textarea => {this.defendant_pleaded  = textarea}}
                                        placeholder={upload && res!==undefined && !csv && this.state.data ? this.state.data[0].被告辩称 : this.props.test_1}
                                    />
                                    :
                                    <div dangerouslySetInnerHTML={{__html:this.state.right}}/>
                            }
                        </div>

                    </div>
                    <div className="row-end-center" style={{marginTop: 20}}>
                        <Input
                            style={{
                                width: "500px",
                                margin: "0 10px 0 0"
                            }}
                            ref={Input => {this.caseID  = Input}}
                            placeholder="案件ID"
                        />
                        <Button
                            type="primary"
                            style={{
                                padding:"0 40px",
                                height:'40px',
                                lineHeight:'40px',
                                textAlign:"center"
                            }}
                            onClick={this.handleGetDecision.bind(this)}
                        >
                            确定
                        </Button>
                    </div>
                    <Radio.Group
                        style={{
                            padding: 30
                        }}
                        options={this.state.plainOptions}
                        defaultValue={'全部'}
                        onChange={this.pointChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        "ip":state.getIn(["Global","ip"]),
        "upload":state.getIn(["Input","upload"]),
        "res":state.getIn(["Input","data"]),
        "csv":state.getIn(["Input","csv"]),
        "threadhold":state.getIn(["Control","threadhold"]),
        "case_type":state.getIn(["Control","case_type"]),
    }),
    dispatch => ({
        setRes(res){
            dispatch(actionCreators.blackbox_classify_upload(res))
        },
        setCSV() {
            dispatch(actionCreators.set_CSV())
        },
        closeCSV(){
            dispatch(actionCreators.close_csv())
        },
    })
)(InputPart);
