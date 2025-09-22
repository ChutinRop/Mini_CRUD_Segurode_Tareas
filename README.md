Aquí tienes un **README** listo para presentar tu mini CRUD de tareas seguro, con toda la información organizada y profesional:

---

# Mini CRUD Seguro de Tareas

## 🎯 Objetivo

Construir una aplicación Full-Stack completa (NestJS + React) que permita la gestión de tareas con autenticación segura mediante JWT. La aplicación incluye un CRUD completo de tareas y sigue buenas prácticas de desarrollo y arquitectura, con una interfaz atractiva y responsiva.

---

## 🛠️ Tecnologías

**Backend:**

* NestJS
* TypeORM + PostgreSQL (o Prisma + PostgreSQL)
* JWT para autenticación
* class-validator para validación de DTOs

**Frontend:**

* React
* Tailwind CSS / MUI para estilos
* Protected Routes para páginas privadas
* Fetch / Axios para consumir API

---

## ⚙️ Backend

### Estructura Mínima

* `TasksModule`
* `TasksController`
* `TasksService`

### Entidad `Task`

| Campo       | Tipo    | Requerido | Default          |
| ----------- | ------- | --------- | ---------------- |
| id          | number  | sí        | auto-incremental |
| title       | string  | sí        | -                |
| description | string  | no        | -                |
| done        | boolean | no        | false            |

### Endpoints

| Método | Ruta             | Descripción            | Autenticación |
| ------ | ---------------- | ---------------------- | ------------- |
| POST   | `/auth/register` | Registrar usuario      | No            |
| POST   | `/auth/login`    | Login y retorno de JWT | No            |
| POST   | `/tasks`         | Crear tarea            | Sí            |
| GET    | `/tasks`         | Listar tareas          | Sí            |
| GET    | `/tasks/:id`     | Obtener tarea por ID   | Sí            |
| PATCH  | `/tasks/:id`     | Actualizar tarea       | Sí            |
| DELETE | `/tasks/:id`     | Eliminar tarea         | Sí            |

### Buenas Prácticas

* Uso de DTOs y validación con `class-validator`
* Manejo correcto de errores y códigos HTTP
* Variables de entorno en `.env.example`
* Migraciones para la base de datos

---

## ⚙️ Frontend

### Rutas

* `/login` → Página de autenticación
* `/register` → Página de registro
* `/tasks` → Página privada de gestión de tareas

### Protected Routes

* `/tasks` solo accesible si el usuario está autenticado
* Redirección automática a `/login` si no hay JWT válido

### Funcionalidades

* Crear tareas mediante formulario
* Listar tareas obtenidas del backend
* Marcar tareas como completadas (toggle `done`)
* Eliminar tareas
* Manejo de estados: carga, error, vacío (empty state)

### UI/UX

* Diseño limpio y responsivo
* Interfaz amigable usando Tailwind CSS o MUI
* Feedback visual en acciones y errores

---

## 📌 Instrucciones de Uso

### Backend

1. Clonar el repositorio y entrar a la carpeta `backend`:

   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Configurar `.env` según `.env.example`
4. Ejecutar migraciones (si usas TypeORM):

   ```bash
   npm run typeorm:migrate
   ```
5. Iniciar servidor:

   ```bash
   npm run start:dev
   ```

### Frontend

1. Entrar a la carpeta `frontend`:

   ```bash
   cd frontend
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Iniciar aplicación:

   ```bash
   npm start
   ```

---

## 🔗 Evidencia de Funcionalidad

* Capturas de la pestaña **Network** mostrando peticiones `POST`, `PATCH`, y `DELETE`.
* Pruebas de login, creación, actualización y eliminación de tareas.

---

Si quieres, puedo hacer una **versión más visual del README**, con capturas de pantalla simuladas de Network y ejemplo de la UI, que queda más profesional para entregar.

¿Quieres que haga esa versión?
