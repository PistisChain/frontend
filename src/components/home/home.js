import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // 引入样式文件

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="title">Who are you?</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/registration')}>Registration</button>
        <button className="button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Home;

