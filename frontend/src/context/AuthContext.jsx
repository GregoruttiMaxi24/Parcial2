
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario')

        try {
            return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
        } catch {
            localStorage.removeItem('usuario')
            return null
        }
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token')
    })

    function guardarSesion(datos) {
        localStorage.setItem('token', datos.token)
        localStorage.setItem('usuario', JSON.stringify(datos.usuario))

        setToken(datos.token)
        setUsuario(datos.usuario)
    }

    function cerrarSesion() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')

        setToken(null)
        setUsuario(null)
    }

    return (
        <AuthContext.Provider
            value={{ usuario, token, guardarSesion, cerrarSesion }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
