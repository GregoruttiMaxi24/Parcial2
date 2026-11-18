
import mongoose from 'mongoose'
import Producto from '../models/Producto.js'
import Categoria from '../models/Categoria.js'

// Resolver una categoría por ID o por nombre
export async function resolverIdCategoria(valor) {
  if (mongoose.Types.ObjectId.isValid(valor)) return valor

  const categoria = await Categoria.findOne({
    nombre: { $regex: `^${valor}$`, $options: 'i' },
  })

  return categoria?._id ?? null
}

// Comprobar si existe una categoría
export function buscarCategoriaPorId(id) {
  return Categoria.findById(id)
}

// Listar productos con filtros
export function listarProductos(filtro) {
  return Producto.find(filtro)
    .populate('categoria', 'nombre')
    .sort({ createdAt: -1 })
}

// Buscar producto por ID
export function obtenerProductoPorId(id) {
  return Producto.findById(id).populate('categoria', 'nombre')
}

// Crear producto
export async function crearProducto(datos) {
  const producto = await Producto.create(datos)
  return producto.populate('categoria', 'nombre')
}

// Actualizar producto
export function actualizarProductoPorId(id, cambios) {
  return Producto.findByIdAndUpdate(id, cambios, {
    new: true,
    runValidators: true,
  }).populate('categoria', 'nombre')
}

// Eliminar producto
export function eliminarProductoPorId(id) {
  return Producto.findByIdAndDelete(id)
}
