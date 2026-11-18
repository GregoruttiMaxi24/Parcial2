import { useEffect, useState } from 'react'
import { obtenerProductos } from '../services/api'
import ProductCard from './ProductCard'

function ProductList() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [buscar, setBuscar] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos()
        setProductos(datos)
      } catch {
        setError('No se pudieron cargar los productos')
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria?.nombre))
  ].filter(Boolean)

  const productosFiltrados = productos.filter((producto) => {
    const texto = buscar.toLowerCase()

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.descripcion.toLowerCase().includes(texto) ||
      producto.marca.toLowerCase().includes(texto)

    const coincideCategoria =
      categoriaSeleccionada === 'Todas' ||
      producto.categoria?.nombre === categoriaSeleccionada

    return coincideBusqueda && coincideCategoria
  })

  if (cargando) {
    return <p className="mensaje">Cargando productos...</p>
  }

  if (error) {
    return <p className="mensaje">{error}</p>
  }

  return (
    <section className="products-section" id="productos">
      <div className="section-heading">
        <span>CATÁLOGO</span>
        <h2>Nuestros productos</h2>
        <p>Encontrá los componentes que necesitás para tu PC.</p>
      </div>

      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />

        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>

          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <ProductCard key={producto._id} producto={producto} />
          ))
        ) : (
          <p className="mensaje">
            No se encontraron productos.
          </p>
        )}
      </div>
    </section>
  )
}

export default ProductList
