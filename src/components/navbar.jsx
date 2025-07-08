import { Link } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-floating">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">Mas IT</Link>
        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-warning fw-bold text-dark" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/register">Registrasi</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
