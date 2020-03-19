import React from "react";
import logo from "../../static/images/logo.png";
import {connect} from "react-redux";
import {actionCreators} from "./store";
const Header = props => {
    const {setIpAddr} = props;
    const ip = window.location.protocol+'//'+window.location.hostname;
    setIpAddr(ip);
    return (
        <div
            className="row-start-center"
            style={{
                width: "100%",
                height: "60px",
                background: "#FFFFFF",
                boxShadow: "0 1px 8px rgba(0,0,0,.3)",
                zIndex: 2
            }}
        >
            <div
                style={{
                    width:"260px",
                    height: "100%",
                    margin:"0 20px",
                    background:`url(${logo}) center center/ 90% auto no-repeat`
                }}
            />
            <span
                style={{
                    fontSize: "26px",
                    width:"300px",
                    textAlign:"center",
                    fontWeight:"bolder",
                    padding: "0 20px"
                }}
            >
                智慧司法软件
            </span>
        </div>
    )
};

export default connect(
    null,
    dispatch => ({
        setIpAddr(ip){
            dispatch(actionCreators.set_ip(ip))
        }
    })
)(Header);
