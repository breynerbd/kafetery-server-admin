# ☕ Kafetery Server - Admin Service

Backend administrativo del sistema **Kafetery**.  
Este servicio permite a los administradores gestionar todos los recursos del sistema:

- Usuarios  
- Restaurantes  
- Menús  
- Órdenes  
- Promociones  
- Reservaciones  
- Mesas  

Además incluye **validaciones, manejo de archivos, control de errores y limitación de peticiones**.

---

# 🚀 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución  
- **Express.js** – Framework para API REST  
- **MongoDB** – Base de datos NoSQL  
- **Mongoose** – Modelado de datos  
- **Helmet** – Seguridad HTTP  
- **CORS** – Control de acceso entre dominios  
- **Multer** – Subida de archivos  
- **Express Validator** – Validación de datos  

---

# 📁 Estructura del Proyecto

```
kafeteria-server-admin
│
├── configs
│   ├── app.js
│   ├── cors-configuration.js
│   ├── db.js
│   └── helmet-configuration.js
│
├── middlewares
│   ├── check-validators.js
│   ├── delete-file-on-error.js
│   ├── file-uploader.js
│   ├── handle-errors.js
│   ├── menu-validators.js
│   ├── order-validators.js
│   ├── promotion-validators.js
│   ├── request-limit.js
│   ├── reservation-validators.js
│   ├── restaurant-validators.js
│   ├── table-validators.js
│   └── user-validators.js
│
├── src
│   ├── internals
│   ├── menus
│   ├── orders
│   ├── promotions
│   ├── reservations
│   ├── restaurants
│   ├── tables
│   └── users
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Instalación

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tu-repositorio/kafetery-server-admin.git
cd kafetery-server-admin
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Variables de entorno

Crear archivo `.env`

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/kafetery
```

## 4️⃣ Ejecutar servidor

```bash
npm run dev
```

o

```bash
node index.js
```

---

# 📡 Endpoints

## 🔐 Internal Routes

### Sincronizar usuario desde servicio de autenticación

```
POST /internals/sync-user
```

Permite sincronizar usuarios desde el **servicio de autenticación** al sistema administrativo.

---

# 🍔 Menus

| Método | Endpoint | Descripción |
|------|------|------|
| GET | `/menus` | Obtener todos los menús |
| GET | `/menus/top` | Obtener menús más vendidos |
| GET | `/menus/:id` | Obtener menú por ID |
| POST | `/menus` | Crear menú |
| PUT | `/menus/:id` | Actualizar menú |
| PUT | `/menus/:id/activate` | Activar menú |
| PUT | `/menus/:id/deactivate` | Desactivar menú |

### Crear menú incluye

- Subida de imagen  
- Validación de datos  
- Manejo de errores de archivos  

---

# 🧾 Orders

| Método | Endpoint |
|------|------|
| GET | `/orders` |
| GET | `/orders/:id` |
| GET | `/orders/restaurant/:id` |
| GET | `/orders/user/:id` |
| POST | `/orders` |
| PUT | `/orders/:id` |
| PUT | `/orders/:id/activate` |
| PUT | `/orders/:id/deactivate` |

---

# 🎟️ Promociones

| Método | Endpoint |
|------|------|
| GET | `/promotions` |
| GET | `/promotions/:id` |
| POST | `/promotions` |
| PUT | `/promotions/:id` |
| PUT | `/promotions/:id/activate` |
| PUT | `/promotions/:id/deactivate` |

---

# 📅 Reservaciones

| Método | Endpoint |
|------|------|
| GET | `/reservations` |
| GET | `/reservations/:id` |
| POST | `/reservations` |
| PUT | `/reservations/:id` |
| PUT | `/reservations/:id/activate` |
| PUT | `/reservations/:id/deactivate` |

---

# 🏪 Restaurantes

| Método | Endpoint |
|------|------|
| GET | `/restaurants` |
| GET | `/restaurants/:id` |
| POST | `/restaurants` |
| PUT | `/restaurants/:id` |
| PUT | `/restaurants/:id/activate` |
| PUT | `/restaurants/:id/deactivate` |

---

# 📊 Reportes de Ventas

### Ventas diarias

```
GET /restaurants/:id/dailySales
```

### Ventas mensuales

```
GET /restaurants/:id/monthlySales
```

---

# 🪑 Tables

| Método | Endpoint |
|------|------|
| GET | `/tables` |
| GET | `/tables/:id` |
| POST | `/tables` |
| PUT | `/tables/:id` |
| PUT | `/tables/:id/activate` |
| PUT | `/tables/:id/deactivate` |

---

# 👤 Users

| Método | Endpoint |
|------|------|
| GET | `/users` |
| GET | `/users/:id` |
| POST | `/users` |
| PUT | `/users/:id` |
| PUT | `/users/:id/activate` |
| PUT | `/users/:id/deactivate` |

---

# 🛡️ Middlewares Incluidos

El sistema incluye middlewares para:

- Validación de datos
- Manejo centralizado de errores
- Eliminación automática de archivos en caso de error
- Subida de imágenes
- Seguridad HTTP
- Control de CORS
- Limitación de peticiones
```