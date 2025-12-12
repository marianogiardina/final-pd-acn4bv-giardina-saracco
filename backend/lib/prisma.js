import dotenv from 'dotenv';
import prismaModule from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const { PrismaClient } = prismaModule;

dotenv.config();

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fonts_db',
  connectionLimit: 5
});

export const prisma = new PrismaClient({ adapter });
