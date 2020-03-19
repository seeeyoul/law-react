import * as constants from "./constants";

export const expert_save = (data,ip) => ({
    type: constants.EXPERT_SAVE,
    data,
    ip
});

export const save_success = () => ({
    type: constants.SAVE_SUCCESS
});

export const save_failed = () => ({
    type: constants.SAVE_FAILED
})
