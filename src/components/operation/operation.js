import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "antd";
import Status from '../status/status';
import './operation.css'; // 引入样式文件

function Home() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Status />
      <div className="home">
        <h1 className="title">Welcome to PistisChain</h1>
        <div className="button-container">
          <button className="button" onClick={() => navigate('/attendance')}>Attendance</button>
          <button className="button" onClick={() => navigate('/TransactionsList')}>TransactionsList</button>
          <button className="button" >Querying</button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

