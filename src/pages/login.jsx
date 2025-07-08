import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../services/authService";
import PasswordInput from "../components/passwordInput";
import ErrorMessage from "../components/errorMessage";
import '../styles/login.css';

function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!inputs.username || !inputs.password) {
      setError('Username dan password harus diisi!');
      return;
    }

    setIsloading(true);

    try {
      const result = await login(inputs);

      if(result?.success && result?.user){
        const storage = rememberMe ? localStorage : sessionStorage
        const { user, token } = result;

        storage.setItem('user', JSON.stringify(user));
        if(token) storage.setItem('token', token);

        if(user.role === 'admin') {
          navigate('/dashboard');
        }else {
          navigate('/');
        }
      }else{
        setError(result?.message || 'Login gagal')
      }
    }catch (err) {
      setError('Error Server')
    }finally {
      setIsloading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome</h1>
        <h3>To</h3>
        <h2>Login Page</h2>
      </div>
      <div className="login-right">
        <h3>Silahkan Login</h3>
        <form onSubmit={handleSubmit}>
          <ErrorMessage message={error} />

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            disabled={isLoading}
          />

          <label>Password</label>
          <PasswordInput
            value={inputs.password}
            onChange={handleChange}
            disabled={isLoading}
          />

          <div className="remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Submit'}
          </button>

          <p className="text-center mt-3">
            Belum punya akun?{" "}
            <Link to="/register" className="text-decoration-none text-primary">
              Register dulu yuk!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
