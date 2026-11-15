import { Router } from 'express'
import {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../controllers/categorias.controller.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'
import { verificarToken } from '../middlewares/verificarToken.js'
import { verificarAdmin } from '../middlewares/verificarAdmin.js'

const router = Router()

// Rutas públicas
router.get('/', listarCategorias)
router.get('/:id', validarObjectId, obtenerCategoria)

// Rutas para administradores
router.post('/', verificarToken, verificarAdmin, crearCategoria)
router.put('/:id', verificarToken, verificarAdmin, validarObjectId, actualizarCategoria)
router.delete('/:id', verificarToken, verificarAdmin, validarObjectId, eliminarCategoria)

export default router