
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProtectedRoute from './routes/ProtectedRoute'
import MyAccount from './pages/MyAccount'
import Admin from './pages/Admin'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import AdminCategorias from './pages/AdminCategorias'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/mi-cuenta" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute rolRequerido="admin"><Admin /></ProtectedRoute>} />
          <Route path="/admin/categorias"element={<ProtectedRoute rolRequerido="admin"><AdminCategorias /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
