# Implementación de Prisma 7 con JavaScript

Este documento detalla los pasos, comandos y modificaciones realizadas para migrar el backend de JSON a MySQL usando Prisma 7 con JavaScript.

## Contexto Inicial

- **Backend**: Express 5 con Node.js
- **Datos**: Almacenados en `data/tipografias.json`
- **Prisma instalado**: v7.1.0 (configurado pero no integrado)

## Problema Principal

Prisma 7 introdujo cambios significativos:
- Ya no soporta `url` en el datasource del schema
- Requiere `prisma.config.ts` para configuración del CLI
- Requiere un **driver adapter** para la conexión del cliente

---

## Paso 1: Instalar el Adapter de MySQL

Prisma 7 usa adapters específicos para cada base de datos. Para MySQL/MariaDB:

```bash
cd backend
npm install @prisma/adapter-mariadb
```

**Dependencias finales en `package.json`:**
```json
{
  "dependencies": {
    "@prisma/client": "^7.1.0",
    "@prisma/adapter-mariadb": "^7.x.x",
    "prisma": "^7.1.0",
    "dotenv": "^17.2.3"
  }
}
```

---

## Paso 2: Configurar el Schema de Prisma

**Archivo: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      Int      @default(1)
  createdAt DateTime @default(now())

  fonts     Font[]

  @@map("users")
}

model Font {
  id        Int      @id @default(autoincrement())
  name      String
  size      String
  style     String
  weight    String
  category  String
  createdAt DateTime @default(now())

  users     User[]

  @@map("fonts")
}
```

> **Nota**: En Prisma 7, NO se incluye `url` en el datasource. La URL se configura en `prisma.config.ts`.

---

## Paso 3: Crear prisma.config.ts

Este archivo es **obligatorio** para el CLI de Prisma (migraciones, generate, etc.).

**Archivo: `backend/prisma.config.ts`**

```typescript
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

> **Nota**: Aunque el proyecto es JavaScript, este archivo debe ser TypeScript porque el CLI de Prisma lo requiere.

---

## Paso 4: Crear el Cliente de Prisma (JavaScript)

**Archivo: `backend/lib/prisma.js`**

```javascript
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fonts_db',
  connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
```

---

## Paso 5: Configurar Variables de Entorno

**Archivo: `backend/.env`**

```env
# URL completa para Prisma CLI (migraciones)
DATABASE_URL="mysql://root:tu_password@localhost:3306/fonts_db"

# Variables individuales para el adapter (aplicación)
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
DATABASE_USER="root"
DATABASE_PASSWORD="tu_password"
DATABASE_NAME="fonts_db"
```

> **Importante**: Se necesitan AMBAS configuraciones:
> - `DATABASE_URL` para el CLI de Prisma
> - Variables individuales para el adapter en la aplicación

---

## Paso 6: Generar el Cliente y Ejecutar Migraciones

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la base de datos y ejecutar migraciones
npx prisma migrate dev --name init
```

**Salida esperada:**
```
Prisma schema loaded from prisma/schema.prisma
MySQL database fonts_db created at localhost:3306
Applying migration `20251207204105_create_users_and_fonts`
Your database is now in sync with your schema.
```

---

## Paso 7: Migrar las Rutas de JSON a Prisma

**Archivo: `backend/routes/fonts.js`**

### Antes (JSON):
```javascript
const fs = require('fs');
const tipografiasPath = path.join(__dirname, '../data', 'tipografias.json');

router.get('/', async (req, res) => {
  const data = await fs.promises.readFile(tipografiasPath, 'utf-8');
  const tipografias = JSON.parse(data);
  res.json(tipografias);
});
```

### Después (Prisma):
```javascript
const { prisma } = require('../lib/prisma');

router.get('/', async (req, res) => {
  try {
    const fonts = await prisma.font.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(fonts);
  } catch (error) {
    res.status(500).json({ message: "Error al leer las tipografías", error: error.message });
  }
});
```

### CRUD Completo:

```javascript
const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');

// Middleware de validación
const validateFontData = (req, res, next) => {
  const { name, size, style, weight, category } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "El campo 'Nombre' es requerido" });
  }
  // ... más validaciones
  next();
};

// GET - Listar todas las fuentes
router.get('/', async (req, res) => {
  try {
    const fonts = await prisma.font.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(fonts);
  } catch (error) {
    res.status(500).json({ message: "Error al leer las tipografías", error: error.message });
  }
});

// POST - Crear fuente
router.post('/', validateFontData, async (req, res) => {
  try {
    const { name, size, style, weight, category } = req.body;
    const newFont = await prisma.font.create({
      data: { name, size, style, weight, category }
    });
    res.status(201).json(newFont);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la tipografía", error: error.message });
  }
});

// PUT - Actualizar fuente
router.put('/:id', validateFontData, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, size, style, weight, category } = req.body;
    const updatedFont = await prisma.font.update({
      where: { id },
      data: { name, size, style, weight, category }
    });
    res.json(updatedFont);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }
    res.status(500).json({ message: "Error al actualizar", error: error.message });
  }
});

// DELETE - Eliminar fuente
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedFont = await prisma.font.delete({
      where: { id }
    });
    res.json({ message: "Tipografía eliminada correctamente", font: deletedFont });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }
    res.status(500).json({ message: "Error al eliminar", error: error.message });
  }
});

module.exports = router;
```

---

## Paso 8: Insertar Datos de Prueba (Opcional)

```javascript
// seed.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

async function seed() {
  const fonts = [
    { name: 'Roboto', size: '16', style: 'normal', weight: '400', category: 'sans-serif' },
    { name: 'Open Sans', size: '14', style: 'normal', weight: '400', category: 'sans-serif' },
    { name: 'Montserrat', size: '20', style: 'normal', weight: '700', category: 'sans-serif' },
  ];

  for (const font of fonts) {
    await prisma.font.create({ data: font });
  }

  console.log('Datos insertados');
  await prisma.$disconnect();
}

seed();
```

Ejecutar con:
```bash
node seed.js
```

---

## Estructura Final del Backend

```
backend/
├── lib/
│   └── prisma.js          # Cliente Prisma (JavaScript)
├── prisma/
│   ├── schema.prisma      # Schema de modelos
│   └── migrations/        # Migraciones SQL
├── routes/
│   └── fonts.js           # Rutas CRUD con Prisma
├── prisma.config.ts       # Config para CLI (TypeScript)
├── app.js                 # Entry point Express
├── .env                   # Variables de entorno
└── package.json
```

---

## Comandos Útiles

```bash
# Generar cliente después de cambios en schema
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Ver datos en interfaz visual
npx prisma studio

# Resetear base de datos (CUIDADO: borra todo)
npx prisma migrate reset

# Sincronizar schema sin migración (desarrollo)
npx prisma db push
```

---

## Errores Comunes y Soluciones

### Error: "pool timeout"
**Causa**: Variables de entorno no cargadas correctamente.
**Solución**: Reiniciar el servidor después de modificar `.env`.

### Error: "P1012 - url is no longer supported"
**Causa**: Prisma 7 no soporta `url` en schema.prisma.
**Solución**: Mover la URL a `prisma.config.ts`.

### Error: "Cannot find module '@prisma/adapter-mariadb'"
**Causa**: Adapter no instalado.
**Solución**: `npm install @prisma/adapter-mariadb`

---

## Referencias

- [Prisma 7 Migration Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- [Prisma MySQL Documentation](https://www.prisma.io/docs/orm/overview/databases/mysql)
- [Driver Adapters](https://www.prisma.io/docs/orm/overview/databases/database-drivers)
