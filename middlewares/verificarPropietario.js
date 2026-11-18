export function verificarPropietario(req, res, next) {
  if (req.usuario.id !== req.params.id && req.usuario.role !== 'admin') {
    return res.status(403).json({
      ok: false,
      mensaje: 'No tenés permiso para acceder a este usuario',
    })
  }

  next()
}