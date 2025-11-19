const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { db } = require('./firebase');


const app = express();
const port = 3000;


app.use(cors());

// Middleware para parsear JSON
app.use(express.json());


const tipografiasPath = path.join(__dirname, 'data', 'tipografias.json');

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

app.get('/',  async (req, res) => {
  const snapshot = await db.collection('tipografias').get();
  console.log(snapshot.docs[0].data());
  res.send('El servidor está funcionando correctamente');
});


app.get('/api/fonts', async (req, res) => {
  try {

    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');

    const tipografias = JSON.parse(data);

    res.json(tipografias);
  } catch (error) {

    res.status(500).json({ message: "Error al leer las tipografías", error: error.message });
    
  }
});


app.post('/api/fonts', validateFontData, async(req, res) => {
  try {
    
    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');
    const tipografias = JSON.parse(data);
    
    
    const nuevaTipografia = {
      id: tipografias.length + 1,
      name: req.body.name,
      size: req.body.size,
      style: req.body.style,
      weight: req.body.weight,
      category: req.body.category
    };
    
    
    tipografias.push(nuevaTipografia);
    
    
    await fs.promises.writeFile(tipografiasPath, JSON.stringify(tipografias));
    
    res.status(201).json(nuevaTipografia);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la tipografía", error: error.message });
  }
});

app.put('/api/fonts/:id', validateFontData, async (req, res) => {
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

app.delete('/api/fonts/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});