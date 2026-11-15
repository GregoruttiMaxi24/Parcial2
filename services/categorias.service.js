
import Categoria from '../models/Categoria.js'

// Listar categorías con filtros
export function listarCategorias(filtro) {
  return Categoria.find(filtro).sort({ nombre: 1 })
}

// Buscar categoría por ID
export function obtenerCategoriaPorId(id) {
  return Categoria.findById(id)
}

// Crear categoría
export function crearCategoria(datos) {
  return Categoria.create(datos)
}

// Actualizar categoría
export function actualizarCategoriaPorId(id, cambios) {
  return Categoria.findByIdAndUpdate(id, cambios, {
    new: true,
    runValidators: true,
  })
}

// Eliminar categoría
export function eliminarCategoriaPorId(id) {
  return Categoria.findByIdAndDelete(id)
}
