import React from 'react';
import {Select} from "antd";
const {Option} = Select;

const SelectModel = (props) => {
    return (
        <div
            className='row-start-center'
            style={{
                width: "50%",
                height:"80px"
            }}
        >
            <div className='left'>
                <label>选择模型</label>
            </div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择模型"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>
        </div>
    )
};

export default SelectModel;
