import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import DashboardAdmin from './pages/dashboard'; // ini untuk /dashboard
import LogPage from './pages/adminLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* khusus admin */}
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/dashboard/logs" element={<LogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
