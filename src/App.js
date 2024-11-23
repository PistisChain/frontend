import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/home/home';
import Registration from './components/registration/registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<Registration />} />  {/* 设置默认路由为 Registration */}
          <Route path="/home" element={<Home />} />    {/* 主页面改为 /home */}
          {/* 其他路由配置可以在这里添加 */}
        </Routes>
    </div>
    </Router>
  );
}

export default App;
