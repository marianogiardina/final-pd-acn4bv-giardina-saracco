const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { prisma } = require('../lib/prisma');


const tipografiasPath = path.join(__dirname, '../data', 'tipografias.json');

const validateFontData = (req, res, next) => {
  const { name, size, style, weight, category } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "El campo 'Nombre' es requerido y debe ser texto válido" });
  }
  
  if (!size || typeof size !== 'string' || size.trim() === '' || isNaN(parseInt(size)) || parseInt(size) <= 0) {
    return res.status(400).json({ message: "El campo 'Tamaño' es requerido y debe ser un numero positivo" });
  }
  
  if (!style || typeof style !== 'string') {
    return res.status(400).json({ message: "El campo 'Estilo' es requerido" });
  }
  
  if (!weight || typeof weight !== 'string') {
    return res.status(400).json({ message: "El campo 'Grosor' es requerido" });
  }
  
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: "El campo 'Categoría' es requerido" });
  }
  
  next();
};

// app.get('/',  async (req, res) => {
//   const snapshot = await db.collection('tipografias').get();
//   console.log(snapshot.docs[0].data());
//   res.send('El servidor está funcionando correctamente');
// });


router.get('/', async (req, res) => {
  try {

    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');

    const tipografias = JSON.parse(data);

    res.json(tipografias);
  } catch (error) {

    res.status(500).json({ message: "Error al leer las tipografías", error: error.message });
    
  }
});


router.post('/', validateFontData, async(req, res) => {
  try {
   
    const nuevaTipografia = await prisma.font.create({
      data: {
        name: req.body.name,
        size: req.body.size,
        style: req.body.style,
        weight: req.body.weight,
        category: req.body.category
      }
    });
    
    res.status(201).json(nuevaTipografia);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la tipografía", error: error.message });
  }
});

router.put('/:id', validateFontData, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');
    const tipografias = JSON.parse(data);
    
    const index = tipografias.findIndex(t => t.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }
    
    tipografias[index] = {
      ...tipografias[index],
      name: req.body.name || tipografias[index].name,
      size: req.body.size || tipografias[index].size,
      style: req.body.style || tipografias[index].style,
      weight: req.body.weight || tipografias[index].weight,
      category: req.body.category || tipografias[index].category
    };
    
    await fs.promises.writeFile(tipografiasPath, JSON.stringify(tipografias, null, 2));
    
    res.json(tipografias[index]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tipografía", error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');
    const tipografias = JSON.parse(data);
    
    const index = tipografias.findIndex(t => t.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }
    
    const tipografiaEliminada = tipografias[index];
    tipografias.splice(index, 1);
    
    await fs.promises.writeFile(tipografiasPath, JSON.stringify(tipografias, null, 2));
    
    res.json({ message: "Tipografía eliminada correctamente", font: tipografiaEliminada });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tipografía", error: error.message });
  }
});

module.exports = router;