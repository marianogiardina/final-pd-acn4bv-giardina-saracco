# parcial-2-pd-acn4bv-giardina-saracco
Repositorio plataformas de desarrollo

## Configuración del Proyecto

### 1. Instalar dependencias

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

1. Instrucciones en el archivo `backend/.env.example` 
2. Configurar la URL de conexión a MySQL (seguir instrucciones en `.env.example`)

### 3. Crear las tablas de la base de datos

```bash
cd backend
npx prisma migrate dev
```

Este comando:
- Ejecuta las migraciones
- Crea las tablas `users`, `fonts` y la tabla intermedia `_FontToUser`

### 4. Levantar el proyecto

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run dev
```
