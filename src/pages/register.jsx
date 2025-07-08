import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from "../services/authService";
import PasswordInput from "../components/passwordInput";
import ErrorMessage from "../components/errorMessage";
import '../styles/register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak sama';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsloading(true);

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        alert('Registrasi Berhasil! Silahkan login');
        navigate('/login');
      } else {
        alert(response.message || 'Registrasi gagal');
      }
    } catch (err) {
      console.error('Registrasi error', err);
      alert('Terjadi kesalahan saat registrasi');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>Welcome</h1>
        <h3>To</h3>
        <h2>Register Page</h2>
      </div>
      <div className="register-right">
        <h3>Silahkan Registrasi</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'is-invalid' : ''}
          />
          <ErrorMessage message={errors.username} />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'is-invalid' : ''}
          />
          <ErrorMessage message={errors.email} />

          <label>Password</label>
          <PasswordInput
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            name="password"
            error={errors.password}
          />
          <ErrorMessage message={errors.password} />

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'is-invalid' : ''}
              disabled={isLoading}
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <ErrorMessage message={errors.confirmPassword} />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Submit'}
          </button>

          <p className="text-center mt-3">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-decoration-none text-primary">
              Masuk ae langsung lewat login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
