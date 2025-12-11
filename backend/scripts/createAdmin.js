import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

async function createAdmin() {
  try {
    const email = 'admin@glypha.com';
    const password = 'admin123';
    const name = 'Administrador';

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('El usuario admin ya existe');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario admin
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 2 // Role 2 = Admin
      }
    });

    console.log('Usuario admin creado exitosamente:');
    console.log({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    console.log('\nEmail:', email);
    console.log('Password:', password);

  } catch (error) {
    console.error('Error al crear usuario admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
