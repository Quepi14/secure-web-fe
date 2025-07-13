import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/logs.css';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Akses ditolak. Anda bukan admin atau belum login.");
      navigate("/login");
      return;
    }

    fetchLogs();
  }, [navigate]);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3300/secure-app/admin/logs', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* 🔵 Floating Navbar */}
      <div className="navbar-floating">
        <div className="navbar-left">Mas IT</div>
        <div className="navbar-right">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/login" className="logout-button">Logout</Link>
        </div>
      </div>

      <div className="dashboard-content">
        <h2 className="mb-4">Log Aktivitas</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Waktu</th>
                <th>Aksi</th>
                <th>Username</th>
                <th>ID Komentar</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Tidak ada data log</td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                    <td>{log.action}</td>
                    <td>{log.username}</td>
                    <td>{log.target_comment_id}</td>
                    <td>{log.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
