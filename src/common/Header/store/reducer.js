import {fromJS} from "immutable";
import * as constants from "./constants";
const defaultState = fromJS({
    ip:"http://127.0.0.1",
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.SET_IP:
            return state.set("ip", action.address);
        default:
            return state;
    }
}
