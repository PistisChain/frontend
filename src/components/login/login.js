import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import './login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [studentID, setStudentID] = useState("");
    const [password, setpassword] = useState("");

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!studentID || !password) {
            message.info("Student ID 和 password 不能为空")
            // alert("Student ID 和 password 不能为空");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:2888/login",
                {
                    studentId: studentID,
                    password: password,
                }
            );
            sessionStorage.setItem("port", response.data.port)
            sessionStorage.setItem("walletId", response.data.wallet.id)
            sessionStorage.setItem("address", response.data.address)
            sessionStorage.setItem("studentId", studentID)
            sessionStorage.setItem("password", password)
            // alert("登录成功");
            message.success('登录成功')
            navigate('/operation')
        } catch (error) {
            console.error("登录失败", error);
            message.error(error?.response?.data.error)
            // alert(error?.response?.data.error);
        }
    };
    return (
        <div className="registration">
            <h2 className="registration-title">Student Login</h2>
            <form className="registration-form">
                <div className="input-group">
                    <label>Student ID:</label>
                    <input
                        type="text"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <button className="button" onClick={handleGenerate}>
                    generate
                </button>
            </form>
        </div>
    );
}

export default Login;