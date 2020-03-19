import * as constants from "./constants";

export const set_ip = address => ({
    type: constants.SET_IP,
    address
});
