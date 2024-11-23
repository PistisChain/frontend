import React, { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import './registration.css';

function Registration() {
    const [studentID, setStudentID] = useState("");
    const [password, setpassword] = useState("");

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!studentID || !password) {
            alert("Student ID 和 password 不能为空");
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
            sessionStorage.setItem("publicKey", response.data.wallet.keyPairs[0].publicKey)
            alert("注册成功");
        } catch (error) {
            console.error("注册失败", error);
            alert(error.response.data.error);
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
=======
import "./registration.css";

function Registration() {
  const [studentID, setStudentID] = useState("");
  const [password, setpassword] = useState("");
  const [pk, setPk] = useState("");
  const [walletId, setWalletId] = useState(""); // 存储生成的 walletId

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!studentID || !password) {
      alert("Student ID 和 password 不能为空");
      return;
    }

    try {
      // 第一步: 请求 /operator/wallets 接口创建钱包并获取 walletId
      const walletResponse = await axios.post(
        "http://localhost:3001/operator/wallets",
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const walletId = walletResponse.data.id;
      setWalletId(walletId); // 保存返回的 walletId

      console.log("钱包创建成功,walletId:", walletId);

      // 第二步: 使用 walletId 和 password 请求 /operator/wallets/{walletId}/addresses 接口生成地址
      const addressResponse = await axios.post(
        `http://localhost:3001/operator/wallets/${walletId}/addresses`,
        {},
        {
          headers: {
            password: password,
          },
        }
      );

      // 获取返回的 address 并将其设置到 pk（Public Key）字段
      const address = addressResponse.data.address;
      setPk(address); // 保存生成的地址到 pk

      console.log("地址生成成功，address:", address);
    } catch (error) {
      console.error("注册失败", error);
      alert("注册失败，请检查控制台错误");
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
        <div className="input-group">
          <label>PK:</label>
          <input type="text" value={pk} readOnly />
        </div>
        <button className="button" onClick={handleGenerate}>
          generate
        </button>
      </form>
    </div>
  );
}

export default Registration;
>>>>>>> ysy
