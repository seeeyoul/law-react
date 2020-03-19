import React,{PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Checkbox} from 'antd';
import {actionCreators} from "./store";
import {url} from "../../utils/net";

const CheckboxGroup = Checkbox.Group;

const defaultCheckedList = [''];
let plainOptions = [
    '交通事故认定书',
    '鉴定意见书',
    '交通事故赔偿协议',
    "伤情/死亡相关性",
    "责任划分",
    '财产赔偿范围',
    '伤害赔偿范围',
    "死亡赔偿范围",
    '精神抚慰金',
    '保险公司是否赔偿',
    "保险公司如何赔偿",
    '机动车所有人责任',
    "雇主责任",
    "道路管理者责任",
    "机动车挂靠方责任"
];
class Save extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    };

    componentWillUpdate(nextProps, nextState, snapshot) {
        if (nextProps.case_type === "marry") {
            plainOptions = [
                "感情破裂",
                "家庭暴力",
                "出轨",
                "重婚",
                "房产",
                "车辆",
                "债权债务",
                "抚养问题",
                "共同财产"
            ]
        } else {
            plainOptions = [
                '交通事故认定书',
                '鉴定意见书',
                '交通事故赔偿协议',
                "伤情/死亡相关性",
                "责任划分",
                '财产赔偿范围',
                '伤害赔偿范围',
                "死亡赔偿范围",
                '精神抚慰金',
                '保险公司是否赔偿',
                "保险公司如何赔偿",
                '机动车所有人责任',
                "雇主责任",
                "道路管理者责任",
                "机动车挂靠方责任"
            ]
        }
    }

    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    save(){
        const res = this.props.res;
        const _data = this.props.case_type === "marry" ? {
            "expert_债权债务": 0,
            "expert_共同财产": 0,
            "expert_出轨": 0,
            "expert_家庭暴力": 0,
            "expert_感情破裂": 0,
            "expert_房产": 0,
            "expert_抚养问题": 0,
            "expert_车辆": 0,
            "expert_重婚": 0,
        } : {
            '交通事故认定书': 0,
            '鉴定意见书': 0,
            '交通事故赔偿协议': 0,
            "伤情/死亡相关性": 0,
            "责任划分": 0,
            '财产赔偿范围': 0,
            '伤害赔偿范围': 0,
            "死亡赔偿范围": 0,
            '精神抚慰金': 0,
            '保险公司是否赔偿': 0,
            "保险公司如何赔偿": 0,
            '机动车所有人责任': 0,
            "雇主责任": 0,
            "道路管理者责任": 0,
            "机动车挂靠方责任": 0
        };
        const data = [];
        const list = this.state.checkedList;
        list.map(item => {
            switch (item) {
                case "感情破裂":
                    return _data["expert_感情破裂"] = 1;
                case "债权债务":
                    return _data["expert_债权债务"] = 1;
                case "出轨":
                    return _data["expert_出轨"] = 1;
                case "共同财产":
                    return _data["expert_共同财产"] = 1;
                case "家庭暴力":
                    return _data["expert_家庭暴力"] = 1;
                case "房产":
                    return _data["expert_房产"] = 1;
                case "抚养问题":
                    return _data["expert_抚养问题"] = 1;
                case "车辆":
                    return _data["expert_车辆"] = 1;
                case "重婚":
                    return _data["expert_重婚"] = 1;
                case "交通事故认定书":
                    return _data['交通事故认定书'] = 1;
                case "鉴定意见书":
                    return _data['鉴定意见书'] = 1;
                case "交通事故赔偿协议":
                    return _data['交通事故赔偿协议'] = 1;
                case "伤情/死亡相关性":
                    return _data["伤情/死亡相关性"] = 1;
                case "责任划分":
                    return _data["责任划分"] = 1;
                case "财产赔偿范围":
                    return _data["财产赔偿范围"] = 1;
                case "伤害赔偿范围":
                    return _data["伤害赔偿范围"] = 1;
                case "死亡赔偿范围":
                    return _data["死亡赔偿范围"] = 1;
                case "精神抚慰金":
                    return _data["精神抚慰金"] = 1;
                case "保险公司是否赔偿":
                    return _data["保险公司是否赔偿"] = 1;
                case "保险公司如何赔偿":
                    return _data["保险公司如何赔偿"] = 1;
                case "机动车所有人责任":
                    return _data["机动车所有人责任"] = 1;
                case "雇主责任":
                    return _data["雇主责任"] = 1;
                case "道路管理者责任":
                    return _data["道路管理者责任"] = 1;
                case "机动车挂靠方责任":
                    return _data["机动车挂靠方责任"] = 1;
                default:
                    return;
            }
        });
        const net = process.env.NODE_ENV === 'production' ? this.props.ip : url;
        const addr = net + ":5000/";
        // const addr = "http://127.0.0.1:5000/";
        // const addr = url;
        let $res = res[0][0];
        $res["type"] = this.props.case_type + "_case";
        $res["result"] = $res["result1"];
        delete $res["result1"];
        data.push(Object.assign($res,_data));
        this.props.handleSave(data[0],addr)
    }
    render() {
        return (
            <div className="row-spacebetween-start" style={{margin:"0 0  20px 0"}}>
                <div className='left'>
                    <label>专家建议</label>
                </div>
                <div className="right" style={{margin:"30px 0"}}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this.onChange}
                        style={{marginBottom:"30px"}}
                    />
                    <br />
                    <div
                        style={{
                            borderTop: '1px solid #E9E9E9',
                            width:"100%",
                            padding:"30px 0"
                        }}
                    >
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全选
                        </Checkbox>
                        <Button
                            type="primary"
                            onClick={this.save.bind(this)}
                        >
                            保存
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        res:state.getIn(["Input","data"]),
        ip:state.getIn(["Global","ip"]),
        case_type: state.getIn(["Control","case_type"])
    }),
    dispatch => ({
        handleSave(data,ip){
            dispatch(actionCreators.expert_save(data,ip))
        }
    })
)(Save);
