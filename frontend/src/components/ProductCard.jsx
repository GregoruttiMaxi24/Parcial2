function ProductCard({ producto }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
  src={producto.imagen}
  alt={producto.nombre}
  onError={(e) => {
    e.currentTarget.style.display = 'none'
}}
/>

        {producto.destacado && (
          <span className="product-badge">Destacado</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">
          {producto.categoria?.nombre}
        </span>

        <h3>{producto.nombre}</h3>

        <p>{producto.descripcion}</p>

        <div className="product-footer">
          <strong>
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              maximumFractionDigits: 0,
            }).format(producto.precio)}
          </strong>

          <span>Stock: {producto.stock}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
