import { Router } from 'express'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productos.controller.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'
import { verificarToken } from '../middlewares/verificarToken.js'
import { verificarAdmin } from '../middlewares/verificarAdmin.js'

const router = Router()

// Rutas públicas
router.get('/', listarProductos)
router.get('/:id', validarObjectId, obtenerProducto)

// Rutas para administradores
router.post('/', verificarToken, verificarAdmin, crearProducto)
router.put('/:id', verificarToken, verificarAdmin, validarObjectId, actualizarProducto)
router.delete('/:id', verificarToken, verificarAdmin, validarObjectId, eliminarProducto)

export default router