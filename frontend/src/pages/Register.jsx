import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registrarUsuario } from '../services/api'

function Register() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')


    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setMensaje('')

        const nombreLimpio = nombre.trim()
        const emailLimpio = email.trim()

        if (!nombreLimpio || !emailLimpio || !password) {
            setError('Completá todos los campos.')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        try {
            const resultado = await registrarUsuario({
                nombre: nombreLimpio,
                email: emailLimpio,
                password,
            })

            setMensaje(resultado.mensaje || 'Usuario registrado correctamente.')

            setNombre('')
            setEmail('')
            setPassword('')
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <section className="auth-container">
            <div className="auth-card">
                <h1>Crear cuenta</h1>
                <p>Registrate para comenzar a comprar.</p>

                <form onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre"
                        required
                    />

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
                        placeholder="Mínimo 6 caracteres"
                        required
                    />

                    <button type="submit">Registrarme</button>
                </form>

                {error && <p className="auth-error">{error}</p>}
                {mensaje && <p className="auth-success">{mensaje}</p>}

                <p className="auth-link">
                    ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
                </p>
            </div>
        </section>
    )
}

export default Register
