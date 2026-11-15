import { Router } from 'express'
import {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarios.controller.js'

import { validarObjectId } from '../middlewares/validarObjectId.js'
import { verificarToken } from '../middlewares/verificarToken.js'
import { verificarAdmin } from '../middlewares/verificarAdmin.js'
import { verificarPropietario } from '../middlewares/verificarPropietario.js'


const router = Router()

router.post('/registro', registrarUsuario)
router.post('/login', loginUsuario)

// Rutas protegidas
router.get('/', verificarToken, verificarAdmin, listarUsuarios)

router.get(
  '/:id',
  verificarToken,
  validarObjectId,
  verificarPropietario,
  obtenerUsuario
)

router.put(
  '/:id',
  verificarToken,
  validarObjectId,
  verificarPropietario,
  actualizarUsuario
)

router.delete(
  '/:id',
  verificarToken,
  verificarAdmin,
  validarObjectId,
  eliminarUsuario
)

export default router