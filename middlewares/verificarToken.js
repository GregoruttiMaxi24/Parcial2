import jwt from 'jsonwebtoken'

export function verificarToken(req, res, next) {
  try {
    const autorizacion = req.headers.authorization

    if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No se proporcionó un token',
      })
    }

    const token = autorizacion.split(' ')[1]
    const datos = jwt.verify(token, process.env.JWT_SECRET)

    req.usuario = datos

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token inválido o expirado',
    })
  }
}