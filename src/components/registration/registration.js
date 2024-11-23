import React, { useState } from "react";
import axios from "axios";
import './registration.css';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Registration() {
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
                "http://localhost:2888/register",
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
            // alert("注册成功");
            message.success("注册成功")
            navigate('/operation')
        } catch (error) {
            console.error("注册失败", error);
            message.error(error.response?.data?.error)
            // alert(error.response.data.error);
        }
    };
    return (
        <div className="registration">
            <h2 className="registration-title">Student Registration</h2>
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

export default Registration;