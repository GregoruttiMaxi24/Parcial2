# PC Store — Parcial 2

Aplicación web de una tienda de componentes de computadora y periféricos. El proyecto está desarrollado con el stack MERN, utilizando Node.js, Express, MongoDB y React.

La idea del proyecto es tener una tienda donde los usuarios puedan registrarse, iniciar sesión y consultar los productos disponibles. También cuenta con un panel de administración desde el cual se pueden gestionar los productos y las categorías.

## Datos del proyecto

- **Nombres y Apellidos:** Máximo Gregorutti - Alan Ortiz
- **Materia:** Aplicaciones Híbridas
- **Docente:** Jonathan Emanuel Cruz
- **Comisión:** DWN4AV

## Stack utilizado

### Backend
- Node.js + Express 5: para desarrollar el servidor y las rutas de la API.
- MongoDB + Mongoose: para almacenar y administrar los datos.
- bcrypt: para proteger las contraseñas mediante hash.
- JSON Web Token (JWT): para la autenticación de usuarios.
- dotenv: para manejar las variables de entorno.
- chalk: para mostrar mensajes en la consola.

### Frontend
- React: para desarrollar la interfaz de la aplicación.
- Vite: para configurar el entorno de desarrollo.
- React Router DOM: para manejar la navegación entre páginas.
- Context API: para compartir los datos de la sesión del usuario.
- CSS: para los estilos de la aplicación.

## Estructura del proyecto

```text
PC-Store/
│
├── config/              Conexión a MongoDB
├── controllers/         Lógica de cada recurso
├── middlewares/         Autenticación, permisos y validaciones
├── models/              Esquemas de Mongoose
├── routes/              Rutas de la API
├── services/            Operaciones con la base de datos
├── public/              Archivos públicos del backend
├── scripts/             Scripts del proyecto
├── index.js             Punto de entrada del servidor
│
└── frontend/
    ├── public/          Archivos públicos de React
    ├── src/
    │   ├── components/  Componentes reutilizables
    │   ├── context/     Contexto de autenticación
    │   ├── pages/       Páginas de la aplicación
    │   ├── routes/      Rutas protegidas
    │   ├── services/    Consumo de la API
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Instalación y uso

Para ejecutar el proyecto localmente se necesitan Node.js, npm y una base de datos MongoDB.

### 1. Configurar el backend

Desde la carpeta principal del proyecto, instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` con los datos necesarios para la conexión a MongoDB y la clave utilizada para generar los tokens JWT.

Ejemplo:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGO_URI=tu_url_de_conexion_a_mongodb
```

La variable de conexión debe coincidir con la que utiliza el archivo `config/db.js`.

Iniciar el servidor:

```bash
npm start
```

Si el proyecto no tiene configurado ese script, se puede iniciar con:

```bash
node index.js
```

El servidor utiliza el puerto 3000 por defecto.

### 2. Configurar el frontend

Abrir otra terminal y entrar en la carpeta `frontend`:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar React con Vite:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Funcionalidades

### Usuarios
- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Contraseñas protegidas con bcrypt.
- Autenticación mediante JWT.
- Persistencia de la sesión utilizando localStorage.
- Diferenciación entre usuarios clientes y administradores.

### Productos
- Visualización del catálogo.
- Búsqueda y filtros de productos.
- Consulta de información de cada producto.
- Crear, editar y eliminar productos desde el panel de administración.

### Categorías
- Visualización de categorías.
- Crear nuevas categorías.
- Editar categorías existentes.
- Eliminar categorías.
- Activar o desactivar categorías.

### Panel de administración
- Acceso exclusivo para administradores.
- Gestión de productos y categorías.
- Formularios para crear y modificar registros.
- Protección de las operaciones mediante JWT y validación de permisos en el backend.

## Endpoints principales

### Categorías (`/api/categorias`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/categorias` | Lista las categorías. Permite filtrar por estado y buscar por nombre. |
| GET | `/api/categorias/:id` | Obtiene una categoría por su ID. |
| POST | `/api/categorias` | Crea una categoría. |
| PUT | `/api/categorias/:id` | Actualiza una categoría. |
| DELETE | `/api/categorias/:id` | Elimina una categoría. |

### Productos (`/api/productos`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Lista los productos y permite aplicar filtros y búsquedas. |
| GET | `/api/productos/:id` | Obtiene un producto por su ID. |
| POST | `/api/productos` | Crea un producto. |
| PUT | `/api/productos/:id` | Actualiza un producto. |
| DELETE | `/api/productos/:id` | Elimina un producto. |

### Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/usuarios/registro` | Registra un usuario. |
| POST | `/api/usuarios/login` | Inicia sesión y devuelve un token JWT. |
| GET | `/api/usuarios` | Lista los usuarios. Solo administradores. |
| GET | `/api/usuarios/:id` | Consulta un usuario según los permisos. |
| PUT | `/api/usuarios/:id` | Actualiza los datos de un usuario según los permisos. |
| DELETE | `/api/usuarios/:id` | Elimina un usuario. Solo administradores. |

Las operaciones para crear, editar y eliminar productos y categorías requieren iniciar sesión con una cuenta administradora.

## Validaciones y seguridad

Durante el desarrollo se incorporaron distintas validaciones para evitar que se guarden datos incorrectos:

- Los campos obligatorios se controlan tanto en el frontend como en el backend.
- Las contraseñas tienen un mínimo de 6 caracteres y se guardan utilizando bcrypt.
- Los emails deben tener un formato válido y no pueden repetirse.
- Los nombres de las categorías no pueden repetirse.
- Se verifica que los IDs recibidos tengan un formato válido de MongoDB.
- Al crear o actualizar productos se comprueba que la categoría exista.
- Se utiliza JWT para identificar a los usuarios.
- Se implementaron middlewares para verificar el token, el rol de administrador y la propiedad de una cuenta.
- Los errores se manejan desde un middleware centralizado para devolver respuestas con el código HTTP correspondiente.

## Autor

**Máximo Gregorutti** **Alan Ortiz**

Proyecto realizado para la materia Aplicaciones Híbridas — Escuela Da Vinci.