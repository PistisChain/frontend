import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // 引入样式文件

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="title">Welcome to the App</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/registration')}>Registration</button>
        <button className="button" >Attendance</button>
        <button className="button" onClick={() => navigate('/TransactionsList')}>TransactionsList</button>
        <button className="button" >Querying</button>
      </div>
    </div>
  );
}

export default Home;

