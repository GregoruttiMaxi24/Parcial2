import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function MyAccount() {
  const { usuario } = useAuth()

  return (
    <>
      <Navbar />

      <section className="auth-container">
        <div className="auth-card">
          <h1>Mi cuenta</h1>
          <p>Bienvenido a PC Store, {usuario?.nombre}.</p>
          <p>Correo: {usuario?.email}</p>
          <p>Tipo de usuario: {usuario?.rol}</p>
        </div>
      </section>
    </>
  )
}

export default MyAccount
