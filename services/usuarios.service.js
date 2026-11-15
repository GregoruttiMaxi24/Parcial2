import Usuario from '../models/Usuario.js'

// Buscar usuario por email
export function buscarUsuarioPorEmail(email) {
  return Usuario.findOne({ email: email.toLowerCase() })
}

// Crear usuario
export function crearUsuario(datos) {
  return Usuario.create(datos)
}

// Listar usuarios
export function listarUsuarios(filtro) {
  return Usuario.find(filtro).select('-password')
}

// Buscar usuario por ID
export function obtenerUsuarioPorId(id) {
  return Usuario.findById(id).select('-password')
}

// Actualizar usuario
export function actualizarUsuarioPorId(id, cambios) {
  return Usuario.findByIdAndUpdate(id, cambios, {
    new: true,
    runValidators: true,
  }).select('-password')
}

// Eliminar usuario
export function eliminarUsuarioPorId(id) {
  return Usuario.findByIdAndDelete(id)
}