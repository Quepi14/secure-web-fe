import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth, logout } from '../services/authService';
import { fetchComments, submitComment } from '../services/commentService';
import Navbar from '../components/navbar';
import CommentCard from '../components/commentCard';
import { updateComment, deleteComment} from '../services/commentService'

function Home() {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const authData = await checkAuth();
      if (authData.loggedIn) {
        setUser(authData.user);
      } else {
        setUser(null);
      }

      const commentsRes = await fetchComments();
      console.log('commentsRes:', commentsRes);

      if (commentsRes.data?.success) {
        setComments(commentsRes.data.data); 
      } else {
        console.warn('Tidak ada komentar berhasil diambil');
      }
    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  };

  fetchData(); 
}, []);

  const loadComments = () => {
    fetchComments().then(res => {
      if (res.success) setComments(res.data);
    });
  };

  const handleEdit = (comment) => {
    setComment(comment.comment);
    setFile(null);
    setEditingComment(comment);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingComment) return;

    try {
      const formData = new FormData();
      formData.append('comment', comment);
      if (file) {
        formData.append('image', file);
      }

      const response = await updateComment(editingComment.id, formData);

      if (response?.data?.success) {
        setComment('');
        setFile(null);
        setEditingComment(null);
        loadComments();
      } else {
        alert(response?.data?.message || 'Gagal update komentar');
      }
    } catch (err) {
      console.error('Update comment error:', err);
      alert('Gagal memperbarui komentar');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;

    try {
      const response = await deleteComment(id);

      if (response?.data?.success) {
        loadComments();
      } else {
        alert(response?.data?.message || 'Gagal menghapus komentar');
      }
    } catch (err) {
      console.error('Delete comment error:', err);
      alert('Terjadi kesalahan saat menghapus komentar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('comment', comment);
    if (file) formDataToSend.append('image', file);

    const res = await submitComment(formDataToSend);
    console.log('submitCOmment reuslt:', res);
    

    if (res?.success) {
      alert(res.data.message);
      setComment('');
      setFile(null);
      loadComments();
    } else {
      alert(res?.message || 'Gagal mengirim komentar');
      console.error(res.message);
    }
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.removeItem('user');
        navigate('/login');
      })
      .catch(err => {
        console.error('Logout gagal', err);
      });
  };


 
  return (
    <div className="custom-container" style={{ paddingBottom: '100px' }}>
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="text-center mt-5 pt-4">
        <h2 className="fw-bold">{user ? `Halo, ${user.username}` : 'KAMU BELUM LOGIN'}</h2>
        <h2>Hello World!</h2>
        <h4 className="mt-3 fw-semibold">Framework Pilihan : React JS</h4>
        <h5 className="mt-3 fw-bold">Anggota:</h5>
        <ul className="list-unstyled">
          <li>Nurul Wachdan Alaudin (231080200106)</li>
          <li>Julia Atmaranti (231080200118)</li>
          <li>Moch. Arya Hidayah (231080200141)</li>
          <li>Masyita Lailil Syafitri (231080200142)</li>
          <li>Nadtasya Faizah Aqilah (231080200150)</li>
        </ul>
      </div>

      {/* Form Komentar */}
      <div className="custom-form-box mt-5 mb-4">
        <form onSubmit={editingComment ? handleUpdate : handleSubmit}>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Masukkan komentar anda</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              placeholder="Tulis komentar..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="gambar" className="form-label">Sertakan Gambar jika ingin</label>
            <input
              type="file"
              className="form-control"
              id="gambar"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className='btn btn-warning fw-bold w-100'>
            {editingComment? 'Update komentar' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Komentar */}
      <div className="mt-5">
        <h4 className="fw-bold">Komentar Terbaru</h4>
        {comments.length > 0 ? (
          <div className="d-flex flex-row flex-wrap gap-3 mt-3">
            {comments.map((item, index) => (
              <CommentCard
                key={index}
                comment={item}
                currentUser={user}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        ) : (
          <p>Belum ada komentar.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
