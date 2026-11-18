
import {
  listarCategorias as listarCategoriasService,
  obtenerCategoriaPorId,
  crearCategoria as crearCategoriaService,
  actualizarCategoriaPorId,
  eliminarCategoriaPorId,
} from '../services/categorias.service.js'

// GET /api/categorias
export async function listarCategorias(req, res, next) {
  try {
    const { activa, buscar } = req.query
    const filtro = {}

    if (activa !== undefined) {
      filtro.activa = activa === 'true'
    }

    if (buscar) {
      filtro.nombre = { $regex: buscar, $options: 'i' }
    }

    const categorias = await listarCategoriasService(filtro)

    res.json({ ok: true, total: categorias.length, categorias })
  } catch (error) {
    next(error)
  }
}

// GET /api/categorias/:id
export async function obtenerCategoria(req, res, next) {
  try {
    const categoria = await obtenerCategoriaPorId(req.params.id)

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoría no encontrada',
      })
    }

    res.json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// POST /api/categorias
export async function crearCategoria(req, res, next) {
  try {
    const { nombre, descripcion, activa } = req.body

    if (typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre de la categoría es obligatorio',
      })
    }

    const categoria = await crearCategoriaService({
      nombre: nombre.trim(),
      descripcion: typeof descripcion === 'string' ? descripcion.trim() : '',
      activa,
    })

    res.status(201).json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// PUT /api/categorias/:id
export async function actualizarCategoria(req, res, next) {
  try {
    const datos = { ...req.body }

    if (datos.nombre !== undefined) {
      if (typeof datos.nombre !== 'string' || !datos.nombre.trim()) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El nombre de la categoría no puede estar vacío',
        })
      }

      datos.nombre = datos.nombre.trim()
    }

    if (datos.descripcion !== undefined && typeof datos.descripcion === 'string') {
      datos.descripcion = datos.descripcion.trim()
    }

    const categoria = await actualizarCategoriaPorId(
      req.params.id,
      datos
    )

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoría no encontrada',
      })
    }

    res.json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/categorias/:id
export async function eliminarCategoria(req, res, next) {
  try {
    const categoria = await eliminarCategoriaPorId(req.params.id)

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoría no encontrada',
      })
    }

    res.json({
      ok: true,
      mensaje: 'Categoría eliminada correctamente',
    })
  } catch (error) {
    next(error)
  }
}
