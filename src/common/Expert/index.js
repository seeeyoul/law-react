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
        switch (nextProps.case_type) {
            case "traffic":
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
                ];
                break;
            case 'marry':
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
                ];
                break;
            case 'zpz':
                plainOptions = [
                    "主观意图",
                    "诈骗行为",
                    "诈骗数额",
                    "因果关系",
                    "诈骗罪",
                    "诈骗或其它特殊犯罪",
                    "单位犯罪",
                    "责任能力",
                    "犯罪形态未遂",
                    "犯罪形态中止",
                    "犯罪形态预备",
                    "共同犯罪",
                    "法律责任的数额认定",
                    "共同犯罪中的地位认定",
                    "胁从犯",
                    "立功",
                    "自首",
                    "被害人过错",
                    "影响量刑",
                    "适用缓刑",
                    "追诉时效",
                    "证据",
                ];
                break;
            default:
                plainOptions = [];
        }
        // if (nextProps.case_type === "marry") {
        //     plainOptions = [
        //         "感情破裂",
        //         "家庭暴力",
        //         "出轨",
        //         "重婚",
        //         "房产",
        //         "车辆",
        //         "债权债务",
        //         "抚养问题",
        //         "共同财产"
        //     ]
        // } else {
        //     plainOptions = [
        //         '交通事故认定书',
        //         '鉴定意见书',
        //         '交通事故赔偿协议',
        //         "伤情/死亡相关性",
        //         "责任划分",
        //         '财产赔偿范围',
        //         '伤害赔偿范围',
        //         "死亡赔偿范围",
        //         '精神抚慰金',
        //         '保险公司是否赔偿',
        //         "保险公司如何赔偿",
        //         '机动车所有人责任',
        //         "雇主责任",
        //         "道路管理者责任",
        //         "机动车挂靠方责任"
        //     ]
        // }
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
        let _data = {};
        switch (this.props.case_type) {
            case 'marry':
                _data = {
                    "expert_债权债务": 0,
                    "expert_共同财产": 0,
                    "expert_出轨": 0,
                    "expert_家庭暴力": 0,
                    "expert_感情破裂": 0,
                    "expert_房产": 0,
                    "expert_抚养问题": 0,
                    "expert_车辆": 0,
                    "expert_重婚": 0,
                };
                break;
            case 'traffic':
                _data = {
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
                break;
            case 'zpz':
                _data = {
                    '主观意图': 0,
                    '诈骗行为': 0,
                    '诈骗数额': 0,
                    "因果关系": 0,
                    "诈骗罪": 0,
                    '诈骗或其它特殊犯罪': 0,
                    '单位犯罪': 0,
                    "责任能力": 0,
                    '犯罪形态未遂': 0,
                    '犯罪形态中止': 0,
                    "犯罪形态预备": 0,
                    '共同犯罪': 0,
                    "法律责任的数额认定": 0,
                    "共同犯罪中的地位认定": 0,
                    "立功": 0,
                    "自首": 0,
                    "被害人过错": 0,
                    "胁从犯": 0,
                    "影响量刑": 0,
                    "适用缓刑": 0,
                    "追诉时效": 0,
                    "证据": 0,
                }
        }
        const data = [];
        let choosedData = {};
        const list = this.state.checkedList;
        list.map(item => {
            if(this.props.case_type === 'marry'){
                choosedData[`expert_${item}`] = 1
            } else {
                choosedData[item] = 1
            }
            return choosedData;
            // switch (item) {
            //     case "感情破裂":
            //         return _data["expert_感情破裂"] = 1;
            //     case "债权债务":
            //         return _data["expert_债权债务"] = 1;
            //     case "出轨":
            //         return _data["expert_出轨"] = 1;
            //     case "共同财产":
            //         return _data["expert_共同财产"] = 1;
            //     case "家庭暴力":
            //         return _data["expert_家庭暴力"] = 1;
            //     case "房产":
            //         return _data["expert_房产"] = 1;
            //     case "抚养问题":
            //         return _data["expert_抚养问题"] = 1;
            //     case "车辆":
            //         return _data["expert_车辆"] = 1;
            //     case "重婚":
            //         return _data["expert_重婚"] = 1;
            //     case "交通事故认定书":
            //         return _data['交通事故认定书'] = 1;
            //     case "鉴定意见书":
            //         return _data['鉴定意见书'] = 1;
            //     case "交通事故赔偿协议":
            //         return _data['交通事故赔偿协议'] = 1;
            //     case "伤情/死亡相关性":
            //         return _data["伤情/死亡相关性"] = 1;
            //     case "责任划分":
            //         return _data["责任划分"] = 1;
            //     case "财产赔偿范围":
            //         return _data["财产赔偿范围"] = 1;
            //     case "伤害赔偿范围":
            //         return _data["伤害赔偿范围"] = 1;
            //     case "死亡赔偿范围":
            //         return _data["死亡赔偿范围"] = 1;
            //     case "精神抚慰金":
            //         return _data["精神抚慰金"] = 1;
            //     case "保险公司是否赔偿":
            //         return _data["保险公司是否赔偿"] = 1;
            //     case "保险公司如何赔偿":
            //         return _data["保险公司如何赔偿"] = 1;
            //     case "机动车所有人责任":
            //         return _data["机动车所有人责任"] = 1;
            //     case "雇主责任":
            //         return _data["雇主责任"] = 1;
            //     case "道路管理者责任":
            //         return _data["道路管理者责任"] = 1;
            //     case "机动车挂靠方责任":
            //         return _data["机动车挂靠方责任"] = 1;
            //     default:
            //         return 0;
            // }
        });
        const net = process.env.NODE_ENV === 'production' ? this.props.ip : url;
        const addr = net + ":5000/";
        let $res = res[0][0];
        $res["type"] = this.props.case_type === 'zpz' ? 'scam_case' : this.props.case_type + "_case";
        $res["result"] = $res["result1"];
        delete $res["result1"];
        data.push(Object.assign($res,choosedData));
        console.log(data[0])
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
