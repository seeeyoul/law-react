import {combineReducers} from "redux-immutable";
import {reducer as inputReducer} from "../common/InputPart/store";
import {reducer as controlReducer} from "../common/Control/store";
import {reducer as globalReducer} from "../common/Header/store";

export default combineReducers({
    Input: inputReducer,
    Control: controlReducer,
    Global: globalReducer
})
