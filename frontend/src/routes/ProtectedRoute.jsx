import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, rolRequerido }) {
  const { token, usuario } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (rolRequerido && usuario?.rol !== rolRequerido) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
