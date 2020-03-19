import * as constants from "./constants";

export const set_setting_num = threadhold => ({
    type: constants.SET_SETTING_NUM,
    threadhold
});
export const set_case_type = case_type => ({
    type: constants.SET_CASE_TYPE,
    case_type
});
