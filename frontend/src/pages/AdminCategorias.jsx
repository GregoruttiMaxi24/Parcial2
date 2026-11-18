
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
} from '../services/api'

function AdminCategorias() {
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [categoriaEditando, setCategoriaEditando] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [activa, setActiva] = useState(true)

    useEffect(() => {
        cargarCategorias()
    }, [])

    async function cargarCategorias() {
        try {
            const datos = await obtenerCategorias()
            setCategorias(datos)
        } catch (error) {
            setError(error.message)
        } finally {
            setCargando(false)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setMensaje('')

        const nombreLimpio = nombre.trim()

        if (!nombreLimpio) {
            setError('El nombre de la categoría es obligatorio.')
            return
        }

        const datos = {
            nombre: nombreLimpio,
            descripcion: descripcion.trim(),
            activa,
        }
        try {
            if (categoriaEditando) {
                await actualizarCategoria(categoriaEditando._id, datos)
                setMensaje('Categoría actualizada correctamente.')
            } else {
                await crearCategoria(datos)
                setMensaje('Categoría creada correctamente.')
            }

            setCategoriaEditando(null)
            setNombre('')
            setDescripcion('')
            setActiva(true)
            setMostrarFormulario(false)

            await cargarCategorias()
        } catch (error) {
            setError(error.message)
        }
    }



    function editarCategoria(categoria) {
        setCategoriaEditando(categoria)
        setNombre(categoria.nombre)
        setDescripcion(categoria.descripcion || '')
        setActiva(categoria.activa)
        setMostrarFormulario(true)
        setError('')
        setMensaje('')
    }


    async function handleEliminar(id) {
        const confirmar = window.confirm(
            '¿Estás seguro de que querés eliminar esta categoría?'
        )

        if (!confirmar) return

        setError('')
        setMensaje('')

        try {
            await eliminarCategoria(id)
            setMensaje('Categoría eliminada correctamente.')
            await cargarCategorias()
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <Navbar />

            <section className="admin-container">
                <div className="admin-heading">
                    <span>ADMINISTRACIÓN</span>
                    <h1>Gestión de categorías</h1>
                    <p>Administrá las categorías de PC Store.</p>
                </div>

                <div className="admin-content">
                    <div className="admin-toolbar">
                        <h2>Categorías registradas</h2>

                        <button
                            className="admin-button"
                            onClick={() => {
                                setMostrarFormulario(!mostrarFormulario)
                                setCategoriaEditando(null)
                                setNombre('')
                                setDescripcion('')
                                setActiva(true)
                                setError('')
                                setMensaje('')
                            }}> {mostrarFormulario ? 'Cancelar' : 'Agregar categoría'}
                        </button>
                    </div>

                    {mensaje && <p className="auth-success">{mensaje}</p>}
                    {error && <p className="auth-error">{error}</p>}

                    {mostrarFormulario && (
                        <form className="product-form" onSubmit={handleSubmit}>
                            <h2>{categoriaEditando ? 'Editar categoría' : 'Nueva categoría'}</h2>
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Procesadores"
                                required
                            />

                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Descripción de la categoría"
                            />

                            <label className="admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={activa}
                                    onChange={(e) => setActiva(e.target.checked)}
                                />
                                Categoría activa
                            </label>

                            <button type="submit" className="admin-button">
                                {categoriaEditando ? 'Actualizar categoría' : 'Guardar categoría'}
                            </button>
                        </form>
                    )}

                    {cargando ? (
                        <p>Cargando categorías...</p>
                    ) : (
                        <>
                            <p className="admin-total">
                                Total de categorías: {categorias.length}
                            </p>

                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categorias.map((categoria) => (
                                            <tr key={categoria._id}>
                                                <td>{categoria.nombre}</td>
                                                <td>{categoria.descripcion}</td>
                                                <td>{categoria.activa ? 'Activa' : 'Inactiva'}</td>
                                                <td>
                                                    <button className="admin-button" onClick={() => editarCategoria(categoria)}>Editar</button>
                                                    <button className="admin-delete-button" onClick={() => handleEliminar(categoria._id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default AdminCategorias
