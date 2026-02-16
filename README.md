# GestionKafetery
☕ GestionKafetery

Sistema de gestión para restaurantes que permite administrar usuarios, restaurantes, menús, órdenes, reservaciones, promociones y mesas.

📦 Configuración del Proyecto
1️⃣ Instalación de MongoDB

Instala MongoDB en tu máquina local:

👉 Descarga oficial:
MongoDB

Configura tu conexión local:

mongodb://localhost:27017/kafetery

2️⃣ Configuración del archivo .env

Cada servidor debe tener su propio archivo .env.

PORT=3000
NODE_ENV=development
URL_MONGODB=mongodb://localhost:27017/kafetery

# Cloudinary
CLOUDINARY_CLOUD_NAME=die1jjc0t
CLOUDINARY_API_KEY=544917921614231
CLOUDINARY_API_SECRET=uCwKJpWMpBcfHplTe2tKcFzXuPw
CLOUDINARY_MENUS_FOLDER=kafetery/menus

📥 Instalación de Dependencias
🔹 Server Admin
npm install axios@^1.13.5 bcrypt@^6.0.0 cors@^2.8.6 dotenv@^17.3.1 \
express@^5.2.1 express-rate-limit@^8.2.1 express-validator@^7.3.1 \
helmet@^8.1.0 jsonwebtoken@^9.0.3 morgan@^1.10.1 nanoid@^5.1.6 \
pg@^8.18.0 pghstore@^2.3.4 sequelize@^6.37.7 uuid@^13.0.0

🔹 User Admin
npm install cors@^2.8.6 dotenv@^17.3.1 express@^5.2.1 \
helmet@^8.1.0 morgan@^1.10.1 pg@^8.18.0 \
pg-hstore@^2.3.4 sequelize@^6.37.7

npm install -D nodemon@^3.1.11

🔹 Server-Admin & Server-User (MongoDB + Cloudinary)
npm install axios@^1.13.5 cloudinary@^1.41.3 cors@^2.8.6 \
dotenv@^17.3.1 express@^5.2.1 express-rate-limit@^8.2.1 \
express-validator@^7.3.1 helmet@^8.1.0 jsonwebtoken@^9.0.3 \
mongoose@^9.2.1 morgan@^1.10.1 multer@^2.0.2 \
multer-storage-cloudinary@^4.0.0 uuid@^13.0.0

🚀 Uso de Postman

Recomendado usar:
Postman

🔐 SERVER ADMIN API
Base URL:
http://localhost:3000/kafetery/v1

👤 Usuarios
Método	Endpoint	Descripción
GET	/users	Listar todos los usuarios
GET	/users/{id}	Obtener usuario por ID
POST	/users	Crear usuario
PUT	/users/{id}	Actualizar usuario
Roles disponibles:

CLIENT
RESTAURANT_ADMIN
PLATFORM_ADMIN

🏪 Restaurantes
Método	Endpoint
GET	/restaurants
GET	/restaurants/{id}
PUT	/restaurants

🍔 Menús
Método	Endpoint
GET	/menus
GET	/menus/{id}
POST	/menus
PUT	/menus/{id}

🧾 Órdenes
Método	Endpoint
GET	/orders
GET	/orders/{id}
POST	/orders
PUT	/orders/{id}

Estados posibles:
PENDING
PREPARING
COMPLETED
CANCELLED

📅 Reservaciones
Método	Endpoint
GET	/reservations
GET	/reservations/{id}
POST	/reservations
PUT	/reservations/{id}

Estados:
PENDING
CONFIRMED
CANCELLED

🎉 Promociones
Método	Endpoint
GET	/promotions
GET	/promotions/{id}
POST	/promotions
PUT	/promotions/{id}

🪑 Mesas
Método	Endpoint
GET	/tables
GET	/tables/{id}
PUT	/tables/{id}

👥 SERVER USER API
Base URL:
http://localhost:3002/kafetery/user/v1

🍽 Menús
GET /menus

🏪 Restaurantes
GET /restaurants

🎉 Promociones
GET /promotions

🪑 Mesas
GET /tables
GET /tables?restaurantId=RESTAURANT_ID

🧾 Órdenes
GET /orders
GET /orders?userId=USER_ID
GET /orders?restaurantId=RESTAURANT_ID
GET /orders?status=PENDING

📅 Reservaciones
GET /reservations
POST /reservations

🏗 Arquitectura

El sistema está dividido en:
Server-Admin → Gestión completa del sistema
Server-User → Consultas y acciones para clientes
MongoDB → Base de datos principal
Cloudinary → Gestión de imágenes
🛠 Tecnologías Utilizadas
Node.js
Express
MongoDB
Mongoose
Cloudinary
