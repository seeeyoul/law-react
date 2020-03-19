import {takeEvery,call} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {EXPERT_SAVE} from "../common/Expert/store/constants";
import axios from "axios";
import {notification} from "antd";
const header = {"Content-type":"application/json"};
const fileDownload =  function (data, fileName) {
    let blob = new Blob([data], {
        type: "application/octet-stream"
    });
    let filename = fileName || "mccExcelTemplate.xls";
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
};
const openNotification = (title,content="") => {
    notification.open({
        message: title,
        description:content,
        placement: "bottomRight"
    });
};
function *handleSave(data) {
    try {
        const _data = JSON.stringify([data.data]);
        const res = yield call(axios.post,data.ip+"black_box/save_record",_data,{headers:header});
        if (res.data.code === 200) {
            openNotification("保存成功");
            // const download = yield axios.post(data.ip+"black_box/export_record",{},{headers:header});
            // if (download.data.code === 200) {
            //     window.location.href = download.data.data;
            // }
        }
    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeEvery(EXPERT_SAVE,handleSave);
}

export default mySaga;
