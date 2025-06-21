import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
