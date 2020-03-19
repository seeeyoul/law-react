import * as constants from "./constants";

export const blackbox_classify_upload = (res) => ({
    type: constants.BLACKBOX_CLASSIFY_UPLOAD,
    res
});
export const set_CSV = () => ({
    type: constants.BLACKBOX_CSV
});
export const close_csv = () => ({
    type: constants.CLOSE_CSV
});
