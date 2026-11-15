export function verificarAdmin(req, res, next) {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({
      ok: false,
      mensaje: 'No tenés permisos para realizar esta acción',
    })
  }

  next()
}