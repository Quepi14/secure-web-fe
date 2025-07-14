import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllComments, deleteComment } from "../services/commentService";
import "../styles/dashboard.css";

const DashboardAdmin = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Akses ditolak. Anda bukan admin atau belum login.");
      navigate("/login");
      return;
    }

    fetchComments();
  }, [navigate]);

  const fetchComments = async () => {
    try {
      const response = await getAllComments();
      if (response?.data?.success && Array.isArray(response.data.data)) {
        setComments(response.data.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Gagal mengambil komentar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
      await deleteComment(id);
      fetchComments();
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* 🔵 Floating Navbar */}
      <div className="navbar-floating">
        <div className="navbar-left">Mas IT</div>
        <div className="navbar-right">
          <Link to="/dashboard/logs" className="nav-link">Logs</Link>
          <Link to="/login" className="logout-button">Logout</Link>
        </div>
      </div>

      {/* 👋 Halaman Salam */}
      <div className="dashboard-content">
        <div className="title-section">
          <h2>Halo, min</h2>
          <h3>Hello World!!</h3>
          <h4><b>Framework Pilihan: React JS</b></h4>
          <h5><b>Anggota:</b></h5>
          <ul>
            <li>Nurul Wachdan Alaudin (231080200106)</li>
            <li>Julia Atmaranti (231080200118)</li>
            <li>Moch. Arya Hidayah (231080200141)</li>
            <li>Masyita Laili Syafitri (231080200142)</li>
            <li>Nadtasya Faizah Aqilah (231080200150)</li>
          </ul>
        </div>

        {/* 💬 Komentar Terbaru */}
        <div className="comments-section">
          <h3>Komentar Terbaru</h3>
          <div className="comments-grid">
            {comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="comment-header">
                  <strong>{comment.username}</strong>
                </div>
                <div className="comment-body">
                  {comment.comment}
                </div>
                {comment.image && (
                  <div className="comment-image-wrapper">
                    <img
                      src={`http://localhost:3300/uploads/${comment.image}`}
                      alt="Komentar"
                      className="comment-image"
                    />
                  </div>
                )}
                <div className="comment-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
