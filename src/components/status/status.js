import React from "react";
import { Layout, Dropdown, Avatar, Menu, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Header } = Layout;

function Status () {
    const navigate = useNavigate();

    // 获取用户名（假设在 sessionStorage 中保存了用户名）
    const username = sessionStorage.getItem("studentId") || "未登录";

    // 菜单项
    const menuItems = [
        {
            key: "profile",
            label: `你好, ${username}`,
        },
        {
            key: "logout",
            label: (
                <span>
                    <LogoutOutlined /> 退出登录
                </span>
            ),
            onClick: () => handleLogout(),
        },
    ];

    // 登出处理
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:2888/logout",
                {
                    port: sessionStorage.getItem('port'),
                    studentId: sessionStorage.getItem('studentId'),
                }
            );
        } catch (error) {
            console.error("登录失败", error);
            message.error(error?.response?.data?.error)
            // alert(error?.response?.data?.error);
        }
        // 清除 sessionStorage 并跳转到登录页
        sessionStorage.removeItem("port")
        sessionStorage.removeItem("walletId")
        sessionStorage.removeItem("address")
        sessionStorage.removeItem("studentId")
        sessionStorage.removeItem("password")
        message.success("已退出登录");
        navigate('/login');
    };

    return (
        <Header style={{ background: "#fff", padding: "0 16px", textAlign: "right" }}>
            <Dropdown
                overlay={<Menu items={menuItems} />}
                trigger={['click']}
                placement="bottomRight"
            >
                <span style={{ cursor: "pointer" }}>
                    <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                </span>
            </Dropdown>
        </Header>
    );
};

export default Status;
