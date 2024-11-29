Library App Backend
Este es el backend de la aplicación Library App, desarrollado con NestJS. La aplicación proporciona funcionalidades de autenticación y permite gestionar libros en una biblioteca. Los usuarios pueden buscar libros, filtrarlos por nombre, año, género o autor, y ver los detalles de un libro específico.

Requisitos
Node.js (version 14.x o superior)
NestJS CLI (opcional, pero recomendado para desarrollo)
Instalación
1. Clona el repositorio
bash
Copy code
git clone https://github.com/AngeloJS04/library-app-back.git
2. Instala las dependencias
Entra en la carpeta del proyecto e instala las dependencias con npm o yarn:

bash
Copy code
cd library-app-back
npm install
o si usas yarn:

bash
Copy code
yarn install
3. Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

env
Copy code
# Variables de conexión a la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=library_app

# Variables de JWT
JWT_SECRET=tu_clave_secreta
JWT_EXPIRATION_TIME=3600s

# Puerto donde corre la app
PORT=4000
4. Inicia la aplicación
Inicia la aplicación de backend en modo de desarrollo con:

bash
Copy code
npm run start:dev
Esto hará que la aplicación esté disponible en http://localhost:4000.

Endpoints
1. Autenticación
POST /auth/login: Autenticación de usuario.

Body:

json
Copy code
{
  "username": "usuario",
  "password": "contraseña"
}
Respuesta:

json
Copy code
{
  "access_token": "jwt_token"
}
2. Libros
Buscar libros
GET /books: Buscar libros con filtros opcionales por nombre, año, género o autor.

Query Parameters:

name: Nombre del libro (opcional).
year: Año de publicación (opcional).
genre: Género del libro (opcional).
author: Autor del libro (opcional).
Ejemplo de URL: /books?name=JavaScript&author=Douglas+Adams

Respuesta:

json
Copy code
[
  {
    "id": 1,
    "name": "JavaScript: The Good Parts",
    "author": "Douglas Crockford",
    "year": 2008,
    "genre": "Programming"
  },
  {
    "id": 2,
    "name": "JavaScript for Beginners",
    "author": "John Doe",
    "year": 2015,
    "genre": "Programming"
  }
]
Ver detalles de un libro
GET /books/:id: Obtener los detalles de un libro específico.

Respuesta:

json
Copy code
{
  "id": 1,
  "name": "JavaScript: The Good Parts",
  "author": "Douglas Crockford",
  "year": 2008,
  "genre": "Programming",
  "description": "A deep dive into the core features of JavaScript."
}
3. Usuarios
Crear usuario
POST /users: Crear un nuevo usuario (para registro).

Body:

json
Copy code
{
  "username": "nuevo_usuario",
  "password": "contraseña_segura",
  "email": "usuario@dominio.com"
}
Respuesta:

json
Copy code
{
  "id": 1,
  "username": "nuevo_usuario",
  "email": "usuario@dominio.com"
}
Obtener usuarios
GET /users: Obtener una lista de todos los usuarios registrados.
4. Manejo de Errores
El sistema utiliza códigos de estado HTTP estándar para indicar el estado de las respuestas:

200 OK: La solicitud fue exitosa.
201 Created: El recurso se creó con éxito.
400 Bad Request: La solicitud está mal formada o le faltan parámetros.
401 Unauthorized: El token JWT no es válido o no se proporcionó.
404 Not Found: El recurso solicitado no fue encontrado.
500 Internal Server Error: Error en el servidor.
Tecnologías
NestJS: Framework de Node.js para crear aplicaciones eficientes y escalables.
TypeORM: ORM para TypeScript que facilita la interacción con bases de datos.
JWT: JSON Web Tokens para la autenticación.
PostgreSQL: Base de datos relacional.