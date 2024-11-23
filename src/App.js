import './App.css';
import Home from './components/home/home';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './components/mine/TransactionsList';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />  {/* 设置默认路由为 Home */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/TransactionsList" element={<TransactionsList/>} />
          {/* 其他路由配置可以在这里添加 */}
        </Routes>
    </div>
    </Router>
  );
}

export default App;
