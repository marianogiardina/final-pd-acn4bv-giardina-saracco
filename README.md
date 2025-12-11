# Glypha

Sistema de gestión de tipografías con autenticación de usuarios y panel de administración.

##  Configuración del Proyecto


### 1. Instalar Dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Configurar Base de Datos

1. Crear una base de datos MySQL 
2. Copiar el archivo de ejemplo `.env.example` a `.env`:
   ```bash
   cd backend
   copy .env.example .env
   ```
3. Editar `backend/.env` con tus credenciales de MySQL:
   ```env
   DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/fonts_db"
   JWT_SECRET="tu-secret-key-aqui"
   JWT_EXPIRES_IN="24h"
   ```

### 3. Ejecutar Migraciones de Base de Datos

```bash
cd backend
npx prisma migrate dev
```

Este comando:
- Ejecuta las migraciones pendientes
- Crea las tablas `users`, `fonts` y la tabla intermedia `_FontToUser` 

### 4. Ejecutar Scripts de Seed (IMPORTANTE)

Estos scripts deben ejecutarse **desde la carpeta backend** en el siguiente orden:

#### 4.1 Crear Usuario Administrador
```bash
cd backend
node scripts/createAdmin.js
```

Este script crea el usuario administrador con las siguientes credenciales:

** Credenciales de Administrador:**
- **Email:** `admin@glypha.com`
- **Contraseña:** `admin123`
- **Rol:** Administrador (puede gestionar todas las tipografías)

#### 4.2 Cargar Tipografías Iniciales
```bash
cd backend
node scripts/seedFonts.js
```

Este script carga la base de datos con tipografías de ejemplo en diferentes categorías.

### 5. Levantar el Proyecto

Necesitas dos terminales abiertas:

#### Terminal 1 - Backend (Puerto 3000)
```bash
cd backend
npm start
```

El servidor backend estará disponible en `http://localhost:3000`

#### Terminal 2 - Frontend (Vite Dev Server)
```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite)

### 6. Acceder a la Aplicación

Para acceder como administrador, usa las credenciales:
   - Email: `admin@glypha.com`
   - Contraseña: `admin123`


##  Tecnologías Utilizadas

### Backend
- Express.js
- Prisma ORM
- MySQL/MariaDB
- JWT Authentication
- bcryptjs

### Frontend
- React 19
- Vite
- React Router v7
- Tailwind CSS v4
- Material-UI Icons


##  Comandos Útiles

### Backend
```bash
npm start                    
npx prisma migrate dev      
```

### Frontend
```bash
npm run dev                 

```


