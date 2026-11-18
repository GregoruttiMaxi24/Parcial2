import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { iniciarSesion } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { guardarSesion } = useAuth()


    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        const emailLimpio = email.trim()

        if (!emailLimpio || !password) {
            setError('Completá todos los campos.')
            return
        }

        try {
            const resultado = await iniciarSesion({
                email: emailLimpio,
                password,
            })

            guardarSesion(resultado)
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <section className="auth-container">
            <div className="auth-card">
                <h1>Iniciar sesión</h1>
                <p>Ingresá a tu cuenta de PC Store.</p>

                <form onSubmit={handleSubmit}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tu contraseña"
                        required
                    />

                    <button type="submit">Ingresar</button>
                </form>

                {error && <p className="auth-error">{error}</p>}

                <p className="auth-link">
                    ¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
