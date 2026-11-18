import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
    obtenerProductos,
    obtenerCategorias,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from '../services/api'

function Admin() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [productoEditando, setProductoEditando] = useState(null)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [marca, setMarca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [imagen, setImagen] = useState('')
    const [destacado, setDestacado] = useState(false)

    useEffect(() => {
        cargarDatos()
    }, [])

    async function cargarDatos() {
        try {
            const productosObtenidos = await obtenerProductos()
            const categoriasObtenidas = await obtenerCategorias()

            setProductos(productosObtenidos)
            setCategorias(categoriasObtenidas)
        } catch {
            setError('No se pudieron cargar los datos.')
        } finally {
            setCargando(false)
        }
    }

    function limpiarFormulario() {
        setProductoEditando(null)
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setStock('')
        setMarca('')
        setCategoria('')
        setImagen('')
        setDestacado(false)
    }

    function editarProducto(producto) {
        setProductoEditando(producto)
        setNombre(producto.nombre)
        setDescripcion(producto.descripcion || '')
        setPrecio(producto.precio)
        setStock(producto.stock)
        setMarca(producto.marca || '')
        setCategoria(producto.categoria?._id || '')
        setImagen(producto.imagen || '')
        setDestacado(producto.destacado || false)

        setMostrarFormulario(true)
        setError('')
        setMensaje('')
    }

    async function handleEliminar(id) {
        const confirmar = window.confirm(
            '¿Estás seguro de que querés eliminar este producto?'
        )

        if (!confirmar) {
            return
        }

        setError('')
        setMensaje('')

        try {
            await eliminarProducto(id)
            setMensaje('Producto eliminado correctamente.')
            await cargarDatos()
        } catch (error) {
            setError(error.message)
        }
    }
    function cancelarFormulario() {
        limpiarFormulario()
        setMostrarFormulario(false)
        setError('')
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setMensaje('')

        const nombreLimpio = nombre.trim()
        const precioNumero = Number(precio)
        const stockNumero = Number(stock)

        if (!nombreLimpio) {
            setError('El nombre del producto es obligatorio.')
            return
        }

        if (precio === '' || !Number.isFinite(precioNumero) || precioNumero < 0) {
            setError('Ingresá un precio válido.')
            return
        }

        if (
            stock === '' ||
            !Number.isInteger(stockNumero) ||
            stockNumero < 0
        ) {
            setError('El stock debe ser un número entero igual o mayor a cero.')
            return
        }

        if (!categoria) {
            setError('Seleccioná una categoría.')
            return
        }

        const datos = {
            nombre: nombreLimpio,
            descripcion: descripcion.trim(),
            precio: precioNumero,
            stock: stockNumero,
            marca: marca.trim(),
            categoria,
            imagen: imagen.trim(),
            destacado,
        }

        try {
            if (productoEditando) {
                await actualizarProducto(productoEditando._id, datos)
                setMensaje('Producto actualizado correctamente.')
            } else {
                await crearProducto(datos)
                setMensaje('Producto creado correctamente.')
            }

            limpiarFormulario()
            setMostrarFormulario(false)

            await cargarDatos()
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
                    <h1>Panel de administración</h1>
                    <p>Gestioná los productos de PC Store.</p>
                </div>

                <div className="admin-content">

                    <div className="admin-toolbar">
                        <h2>Productos registrados</h2>

                        <div>
                            <button
                                className="admin-button"
                                onClick={() => window.location.href = '/admin/categorias'}
                            >
                                Gestionar categorías
                            </button>

                            <button
                                className="admin-button"
                                onClick={() => {
                                    if (mostrarFormulario) cancelarFormulario()
                                    else {
                                        limpiarFormulario()
                                        setMostrarFormulario(true)
                                        setMensaje('')
                                    }
                                }}
                            >
                                {mostrarFormulario ? 'Cancelar' : 'Agregar producto'}
                            </button>
                        </div>
                    </div>


                    {error && <p className="auth-error">{error}</p>}
                    {mensaje && <p className="auth-success">{mensaje}</p>}

                    {mostrarFormulario && (
                        <form className="product-form" onSubmit={handleSubmit}>
                            <h2>
                                {productoEditando ? 'Editar producto' : 'Nuevo producto'}
                            </h2>

                            <label>Nombre del producto</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />

                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />

                            <label>Precio</label>
                            <input
                                type="number"
                                min="0"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />

                            <label>Stock</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />

                            <label>Marca</label>
                            <input
                                type="text"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />

                            <label>Categoría</label>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            >
                                <option value="">Seleccioná una categoría</option>

                                {categorias.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>

                            <label>URL de imagen (opcional)</label>
                            <input
                                type="url"
                                value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                                placeholder="https://..."
                            />

                            <label className="admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={destacado}
                                    onChange={(e) => setDestacado(e.target.checked)}
                                />
                                Producto destacado
                            </label>

                            <button type="submit" className="admin-button">
                                {productoEditando ? 'Guardar cambios' : 'Guardar producto'}
                            </button>
                        </form>
                    )}

                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <>
                            <p className="admin-total">
                                Total de productos: {productos.length}
                            </p>

                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {productos.map((producto) => (
                                            <tr key={producto._id}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.categoria?.nombre}</td>
                                                <td>
                                                    {new Intl.NumberFormat('es-AR', {
                                                        style: 'currency',
                                                        currency: 'ARS',
                                                        maximumFractionDigits: 0,
                                                    }).format(producto.precio)}
                                                </td>
                                                <td>{producto.stock}</td>
                                                <td>
                                                    <button
                                                        className="admin-button"
                                                        onClick={() => editarProducto(producto)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="admin-delete-button"
                                                        onClick={() => handleEliminar(producto._id)}
                                                    >
                                                        Eliminar
                                                    </button>
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

export default Admin
