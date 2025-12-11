import { prisma } from '../lib/prisma.js';

const fontsSeed = [
  {
    name: 'Arial',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Sans-serif'
  },
  {
    name: 'Helvetica',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Sans-serif'
  },
  {
    name: 'Verdana',
    size: '14px',
    style: 'normal',
    weight: '400',
    category: 'Sans-serif'
  },
  {
    name: 'Times New Roman',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Serif'
  },
  {
    name: 'Georgia',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Serif'
  },
  {
    name: 'Courier New',
    size: '14px',
    style: 'normal',
    weight: '400',
    category: 'Monospace'
  },
  {
    name: 'Courier',
    size: '14px',
    style: 'normal',
    weight: '400',
    category: 'Monospace'
  },
  {
    name: 'Comic Sans MS',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Cursive'
  },
  {
    name: 'Trebuchet MS',
    size: '16px',
    style: 'normal',
    weight: '400',
    category: 'Sans-serif'
  },
  {
    name: 'Impact',
    size: '20px',
    style: 'normal',
    weight: '700',
    category: 'Display'
  }
];

async function seedFonts() {
  try {
    console.log('🌱 Iniciando seed de fuentes...\n');

    // Contar fuentes existentes
    const existingCount = await prisma.font.count();
    console.log(`Fuentes existentes: ${existingCount}`);

    // Insertar fuentes
    let createdCount = 0;
    for (const fontData of fontsSeed) {
      try {
        const font = await prisma.font.create({
          data: fontData
        });
        console.log(`Creada: ${font.name} (ID: ${font.id})`);
        createdCount++;
      } catch (error) {
        console.log(`Error creando ${fontData.name}:`, error.message);
      }
    }

    console.log(`\nProceso completado: ${createdCount} fuentes creadas`);
    
    // Mostrar total final
    const totalCount = await prisma.font.count();
    console.log(`Total de fuentes en la base de datos: ${totalCount}`);

  } catch (error) {
    console.error('Error en el seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFonts();
