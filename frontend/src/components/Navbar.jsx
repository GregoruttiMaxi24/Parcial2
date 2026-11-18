import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { usuario, token, cerrarSesion } = useAuth()

  function handleCerrarSesion() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          PC<span>STORE</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
        </nav>

        <div className="nav-actions">
          {token ? (
            <>
              <Link to="/mi-cuenta" className="login-link">
                Hola, {usuario?.nombre}
              </Link>

              {usuario?.rol === 'admin' && (
                <Link to="/admin" className="login-link">
                  Administración
                </Link>
              )}

              <button
                onClick={handleCerrarSesion}
                className="logout-button"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Iniciar sesión
              </Link>

              <Link to="/registro" className="login-link">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
