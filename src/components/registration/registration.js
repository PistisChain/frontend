import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './registration.css';

function Registration() {
    const [studentID, setStudentID] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!studentID || !password) {
            alert("Student ID and password cannot be empty");
            return;
        }

        try {
            // 第一步: 请求 /operator/wallets 接口创建钱包并获取 walletId
            const response = await axios.post(
                "http://localhost:2888/register",
                {
                    studentId: studentID,
                    password: password,
                }
            );
            console.log(response.data)
            sessionStorage.setItem("port", response.data.port)
            sessionStorage.setItem("publicKey", response.data.wallet.keyPairs[0].publicKey)
            console.log(response.data.wallet.keyPairs.publicKey, 99999);
            

            alert("Registration is successful!");

            // 注册成功后跳转到主页面
            navigate("/"); // 跳转到主页面

            
        //     const walletId = walletResponse.data.id;
        //     setWalletId(walletId); // 保存返回的 walletId

        //     console.log("钱包创建成功，walletId:", walletId);

        //     // 第二步: 使用 walletId 和 password 请求 /operator/wallets/{walletId}/addresses 接口生成地址
        //     const addressResponse = await axios.post(
        //         `http://localhost:3001/operator/wallets/${walletId}/addresses`,
        //         {},
        //         {
        //             headers: {
        //                 password: password,
        //             },
        //         }
        //     );

        //     //   获取返回的 address 并将其设置到 pk（Public Key）字段
        //     const address = addressResponse.data.address;
        //     setPk(address); // 保存生成的地址到 pk

        //     console.log("地址生成成功，address:", address);
        //     //第三步 挖矿

        //       const mineResponse = await axios.post(
        //     "http://localhost:3001/miner/mine",
        //     {
        //         rewardAddress: address, // 使用生成的公钥作为奖励地址
        //         feeAddress: address, // 使用生成的公钥作为手续费地址
        //     }
        // );

        // console.log("挖矿成功，新区块信息:", mineResponse.data);
        // alert("挖矿成功并生成新区块！");

        //     // 第四步: 调用 /operator/wallets/:walletId/transactions 将地址添加到交易池
            // const transactionResponse = await axios.post(
            //     `http://localhost:3001/operator/wallets/${walletId}/transactions`,
            //     {
            //         fromAddress: address, // 发送地址为生成的公钥
            //         toAddress: "4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23", // 假设接收方是一个系统内置地址
            //         amount: 0, // 注册不涉及金额
            //         changeAddress:address,
            //     },
            //     {
            //         headers: {
            //             password: password,
            //         },
            //     }
            // );

        //    console.log("交易成功，transaction ID:", transactionResponse.data.id);

        //   alert("注册成功并添加交易到区块链池！");
        } catch (error) {
            console.error("registration failure", error);
            alert("registration failure");
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
