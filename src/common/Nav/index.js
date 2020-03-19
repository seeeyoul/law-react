import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

const {SubMenu} = Menu;

class Nav extends Component{
    state = {
        theme: 'light',
        current: '1',
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 256 , height:'calc(100vh - 60px)'}}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>黑盒模式</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to="/">
                                基于分类的争议焦点推荐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/blackbox_knowledge">
                                基于知识图谱的争议焦点推荐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/blackbox_abstract_extraction">
                                裁判文书摘要提取
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>白盒模式</span>
                            </span>
                        }
                    >
                        <Menu.Item key="4">
                            <Link to="/whitebox_classify">
                                基于分类的争议焦点推荐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/whitebox_knowledge">
                                基于知识图谱的争议焦点推荐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/whitebox_abstract_extraction">
                                裁判文书摘要提取
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>词库构建</span>
                            </span>
                        }
                    >
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default connect(
    state => ({
        "ip":state.getIn(["Global","ip"]),
    }),
    null
)(Nav);
