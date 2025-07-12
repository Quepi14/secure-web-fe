import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import LogPage from './pages/adminLog'; // Ganti 'logs' menjadi 'LogPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/logs" element={<LogPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
