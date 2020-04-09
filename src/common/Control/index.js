import React from "react";
import {Input, notification,Select} from "antd";
import {connect} from "react-redux";
import {actionCreators} from "./store";
const {Option} = Select;
const {Search} = Input;
const openNotification = (title,content="") => {
    notification.open({
        message: title,
        description:content,
        placement: "bottomRight"
    });
};
const Control = props => {
    const {set_setting_num,set_case_type,case_type} = props;
    return (
        <div
    className='row-start-center'
    style={{
        width: "50%",
            height:"80px"
    }}
>
<div className='left'>
        <label>设置</label>
        </div>
        <Select
    showSearch
    style={{
        width: 200,
            margin: "0 20px",
    }}
    placeholder={case_type}
    optionFilterProp="children"
    filterOption={(input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
    onSelect={(option)=>{set_case_type(option)}}
>
<Option value="marry">婚姻类</Option>
        <Option value="traffic">交通类</Option>
        <Option value="zpz">诈骗类</Option>
        </Select>
        <Search
    placeholder={`当前系数${props.threadhold}`}
    enterButton="设置"
    size="large"
    onSearch={value => {set_setting_num(value)}}
    style={{
        width: "300px"
    }}
    />
    </div>
)
};

export default connect(
    state =>({
        threadhold:state.getIn(["Control","threadhold"]),
        case_type:state.getIn(["Control","case_type"])
    }),
    dispatch => ({
        set_setting_num(threadhold){
            if (threadhold <= 0 || threadhold > 1) {
                openNotification("系数应该为大于0小于等于1的值")
            } else {
                dispatch(actionCreators.set_setting_num(threadhold))
            }
        },
        set_case_type(case_type){
            dispatch(actionCreators.set_case_type(case_type))
        }
    })
)(Control);
