# Library App Backend

Este es el backend de la aplicación **Library App**, desarrollado con **NestJS**. La aplicación proporciona funcionalidades de autenticación y permite gestionar libros en una biblioteca. Los usuarios pueden buscar libros, filtrarlos por nombre, año, género o autor, y ver los detalles de un libro específico.

## Requisitos

- **Node.js** (version 14.x o superior)
- **NestJS CLI** (opcional, pero recomendado para desarrollo)

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/AngeloJS04/library-app-back.git
```

### 2. Instala las dependencias

Entra en la carpeta del proyecto e instala las dependencias con npm o yarn:

```bash
cd library-app-back
npm install
```


### 3. Configura las variables de entorno

# Variables de conexión a la base de datos
````bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=library_app
````

# Variables de JWT
JWT_SECRET=tu_clave_secreta
JWT_EXPIRATION_TIME=3600s

# Puerto donde corre la app
PORT=4000

### 4. Inicia la aplicación

```bash
npm run start:dev
```

## Endpoints

### 1. **Autenticación**

#### POST `/auth/login`

Autenticación de usuario.

**Body:**
```json
{
  "username": "usuario",
  "password": "contraseña"
}



