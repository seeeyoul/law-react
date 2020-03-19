import {fromJS} from "immutable";
import * as constants from "./constants";
const defaultState = fromJS({
    upload:false,
    data:[],
    csv: false
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.BLACKBOX_CLASSIFY_UPLOAD:
            return state.merge({upload: true},{data:action.res});
        case constants.BLACKBOX_CSV:
            return state.merge({upload: false},{data:action.res},{csv:true});
        case constants.CLOSE_CSV:
            return state.merge({upload: true},{csv:false});
        default:
            return state;
    }
}
