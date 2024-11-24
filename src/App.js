import './App.css';
import Home from './components/home/home';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Operation from './components/operation/operation';
import Query from './components/query/query';
import Attendance from './components/attendance/attendance';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import TransactionsList from './components/mine/TransactionsList';

const isAuthenticated = () => {
  return sessionStorage.getItem('studentId') !== null;
};

// 受保护的路由组件
const PrivateRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

// 登录后禁止访问的路由组件
const RestrictedRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/operation" /> : <Home />
            }
          />
          <Route
            path="/registration"
            element={
              <RestrictedRoute
                element={<Registration />}
                redirectTo="/operation"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute element={<Login />} redirectTo="/operation" />
            }
          />
          <Route
            path="/TransactionsList"
            element={<PrivateRoute element={<TransactionsList />} redirectTo="/" />}
          />
          <Route
            path="/attendance"
            element={<PrivateRoute element={<Attendance />} redirectTo="/" />}
          />
          <Route
            path="/operation"
            element={<PrivateRoute element={<Operation />} redirectTo="/" />}
          />
          <Route
            path="/query"
            element={<PrivateRoute element={<Query />} redirectTo="/" />}
          />
          {/* 其他路由配置可以在这里添加 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
