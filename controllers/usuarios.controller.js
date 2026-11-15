import bcrypt from 'bcrypt'
import {
  buscarUsuarioPorEmail,
  crearUsuario,
  listarUsuarios as listarUsuariosService,
  obtenerUsuarioPorId,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
} from '../services/usuarios.service.js'
import jwt from 'jsonwebtoken'

function sinPassword(usuario) {
  const { password, ...resto } = usuario.toObject()
  return resto
}

// POST /api/usuarios/registro
export async function registrarUsuario(req, res, next) {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'Nombre, email y contraseña son obligatorios' })
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 6 caracteres',
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const usuario = await crearUsuario({
      nombre,
      email,
      password: passwordHash,
    })

    res.status(201).json({ ok: true, usuario: sinPassword(usuario) })
  } catch (error) {
    next(error)
  }
}

// POST /api/usuarios/login
export async function loginUsuario(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'Email y contraseña son obligatorios' })
    }

    const usuario = await buscarUsuarioPorEmail(email)

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Email o contraseña incorrectos',
      })
    }

    const coincide = await bcrypt.compare(password, usuario.password)

    if (!coincide) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Email o contraseña incorrectos',
      })
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        name: usuario.nombre,
        role: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      ok: true,
      token,
      usuario: sinPassword(usuario),
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/usuarios
export async function listarUsuarios(req, res, next) {
  try {
    const { rol, buscar } = req.query
    const filtro = {}

    if (rol) filtro.rol = rol
    if (buscar) filtro.nombre = { $regex: buscar, $options: 'i' }

    const usuarios = await listarUsuariosService(filtro)
    res.json({ ok: true, total: usuarios.length, usuarios })
  } catch (error) {
    next(error)
  }
}

// GET /api/usuarios/:id
export async function obtenerUsuario(req, res, next) {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id)

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, usuario })
  } catch (error) {
    next(error)
  }
}

// PUT /api/usuarios/:id
export async function actualizarUsuario(req, res, next) {
  try {
    const cambios = {
      nombre: req.body.nombre,
      email: req.body.email,
    }

    if (req.body.password) {
      cambios.password = req.body.password
    }

    if (cambios.password) {
      if (cambios.password.length < 6) {
        return res.status(400).json({
          ok: false,
          mensaje: 'La contraseña debe tener al menos 6 caracteres',
        })
      }
      cambios.password = await bcrypt.hash(cambios.password, 10)
    }

    const usuario = await actualizarUsuarioPorId(req.params.id, cambios)

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, usuario })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/usuarios/:id
export async function eliminarUsuario(req, res, next) {
  try {
    const usuario = await eliminarUsuarioPorId(req.params.id)

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}
