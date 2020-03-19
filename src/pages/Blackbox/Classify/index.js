import React,{Component} from "react";
import SelectModel from "../../../common/SelectModel";
import InputPart from "../../../common/InputPart";
import OutputPart from "../../../common/OutputPart";
import ArguePoint from "../../../common/ArguePoint";
import Expert from "../../../common/Expert";
import Accuracy from "../../../common/Accuracy";
import Control from "../../../common/Control";

class BlackboxClassify extends Component{
    render() {
        return (
            <div>
                <div
                    className="row-spacebetween-center"
                >
                    <SelectModel/>
                    <Control/>
                </div>
                <InputPart test_0={"原告诉称"} test_1={"被告辩称"}/>
                <ArguePoint/>
                <OutputPart/>
                <Expert/>
                <Accuracy/>
            </div>
        )
    }
}

export default BlackboxClassify
