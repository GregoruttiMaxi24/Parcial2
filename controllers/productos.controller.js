
import mongoose from 'mongoose'
import {
  resolverIdCategoria,
  buscarCategoriaPorId,
  listarProductos as listarProductosService,
  obtenerProductoPorId,
  crearProducto as crearProductoService,
  actualizarProductoPorId,
  eliminarProductoPorId,
} from '../services/productos.service.js'

// Si no cargan una imagen, generamos un placeholder con el nombre del producto.
function imagenPorDefecto(nombre) {
  const texto = encodeURIComponent(nombre || 'Producto')
  return `https://placehold.co/500x400?text=${texto}`
}

// GET /api/productos
// Filtros disponibles: categoria, marca, destacado, enStock, precioMin, precioMax
// Búsqueda por nombre: ?buscar=texto
export async function listarProductos(req, res, next) {
  try {
    const {
      categoria,
      marca,
      destacado,
      enStock,
      precioMin,
      precioMax,
      buscar,
    } = req.query

    const filtro = {}

    if (categoria) {
      const idCategoria = await resolverIdCategoria(categoria)
      // Si la categoría no existe, devolvemos una lista vacía
      filtro.categoria = idCategoria ?? '000000000000000000000000'
    }

    if (marca) {
      filtro.marca = { $regex: marca, $options: 'i' }
    }

    if (destacado !== undefined) {
      filtro.destacado = destacado === 'true'
    }

    if (enStock === 'true') filtro.stock = { $gt: 0 }
    if (enStock === 'false') filtro.stock = { $lte: 0 }

    if (precioMin || precioMax) {
      filtro.precio = {}
      if (precioMin) filtro.precio.$gte = Number(precioMin)
      if (precioMax) filtro.precio.$lte = Number(precioMax)
    }

    if (buscar) {
      filtro.nombre = { $regex: buscar, $options: 'i' }
    }

    const productos = await listarProductosService(filtro)

    res.json({ ok: true, total: productos.length, productos })
  } catch (error) {
    next(error)
  }
}

// GET /api/productos/:id
export async function obtenerProducto(req, res, next) {
  try {
    const producto = await obtenerProductoPorId(req.params.id)

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })
    }

    res.json({ ok: true, producto })
  } catch (error) {
    next(error)
  }
}

// POST /api/productos
export async function crearProducto(req, res, next) {
  try {
    const { nombre, precio, categoria } = req.body

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ ok: false, mensaje: 'El nombre es obligatorio' })
    }

    if (precio === undefined || Number(precio) < 0) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'El precio es obligatorio y no puede ser negativo' })
    }

    if (!categoria) {
      return res.status(400).json({ ok: false, mensaje: 'La categoría es obligatoria' })
    }

    if (!mongoose.Types.ObjectId.isValid(categoria)) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'La categoría indicada no tiene un id válido' })
    }

    const categoriaExiste = await buscarCategoriaPorId(categoria)

    if (!categoriaExiste) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'La categoría indicada no existe' })
    }

    const producto = await crearProductoService({
      ...req.body,
      imagen: req.body.imagen || imagenPorDefecto(nombre),
    })

    res.status(201).json({ ok: true, producto })
  } catch (error) {
    next(error)
  }
}

// PUT /api/productos/:id
export async function actualizarProducto(req, res, next) {
  try {
    if (req.body.categoria) {
      if (!mongoose.Types.ObjectId.isValid(req.body.categoria)) {
        return res
          .status(400)
          .json({ ok: false, mensaje: 'La categoría indicada no tiene un id válido' })
      }

      const categoriaExiste = await buscarCategoriaPorId(req.body.categoria)

      if (!categoriaExiste) {
        return res
          .status(400)
          .json({ ok: false, mensaje: 'La categoría indicada no existe' })
      }
    }

    const producto = await actualizarProductoPorId(req.params.id, req.body)

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })
    }

    res.json({ ok: true, producto })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/productos/:id
export async function eliminarProducto(req, res, next) {
  try {
    const producto = await eliminarProductoPorId(req.params.id)

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })
    }

    res.json({ ok: true, mensaje: 'Producto eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}
