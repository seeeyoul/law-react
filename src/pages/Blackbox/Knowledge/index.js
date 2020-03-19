import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {url} from "../../../utils/net";

const BlackboxKnowledge = ({ip}) => {
    const net = process.env.NODE_ENV === 'production' ? ip : url;
    const [innerPage, setInnerPage] = useState("");
    useEffect(() => {
        axios.post(net+':5000/get_knowledge_graph').then(
            res => {
                setInnerPage(res.data.data);
            }
        )
    },[]);

    return (
        <>
            <div
                id="body"
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#a9a9a9"
                }}
            >
                <iframe
                    width="98%"
                    height="98%"
                    src={innerPage}
                    style={{
                        border: "0"
                    }}
                 />
            </div>
        </>
    )
};

export default connect(
    state => ({
        "ip":state.getIn(["Global","ip"])
    }),
    null
)(BlackboxKnowledge)
