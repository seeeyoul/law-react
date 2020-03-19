import {fromJS} from "immutable";
import * as constants from "./constants";
const defaultState = fromJS({
    threadhold:0.2,
    case_type: "traffic"
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.SET_SETTING_NUM:
            return state.set("threadhold", action.threadhold);
        case constants.SET_CASE_TYPE:
            return state.set("case_type", action.case_type);
        default:
            return state;
    }
}
