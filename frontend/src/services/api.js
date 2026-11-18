const API_URL = '/api'

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`)

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los productos')
  }

  const datos = await respuesta.json()

  return datos.productos
}

export async function registrarUsuario(datos) {
  const respuesta = await fetch(`${API_URL}/usuarios/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error('No se pudo registrar el usuario')
  }

  return resultado
}

export async function iniciarSesion(datos) {
  const respuesta = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error('Correo o contraseña incorrectos')
  }

  return resultado
}

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias`)

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las categorías')
  }

  const datos = await respuesta.json()
  return datos.categorias
}

export async function crearProducto(datos) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo crear el producto')
  }

  return resultado
}

export async function actualizarProducto(id, datos) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo actualizar el producto')
  }

  return resultado
}

export async function eliminarProducto(id) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo eliminar el producto')
  }

  return resultado
}

export async function crearCategoria(datos) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo crear la categoría')
  }

  return resultado
}

export async function actualizarCategoria(id, datos) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo actualizar la categoría')
  }

  return resultado
}

export async function eliminarCategoria(id) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'No se pudo eliminar la categoría')
  }

  return resultado
}

