const express = require('express');

const fs = require('fs');
const path = require('path');

const { db } = require('./firebase');


const app = express();
const port = 3000;


// Middleware para parsear JSON
app.use(express.json());


const tipografiasPath = path.join(__dirname, 'data', 'tipografias.json');



app.get('/',  async (req, res) => {

  const snapshot = await db.collection('tipografias').get();

  console.log(snapshot.docs[0].data());


  res.send('Hola soy juan:)');
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


app.post('/api/fonts', async(req, res) => {
  try {
    
    const data = await fs.promises.readFile(tipografiasPath, 'utf-8');
    const tipografias = JSON.parse(data);
    
    
    const nuevaTipografia = {
      id: tipografias.length + 1,
      name: req.body.name,
      size: req.body.size,
      style: req.body.style,
      weight: req.body.weight
    };
    
    
    tipografias.push(nuevaTipografia);
    
    
    await fs.promises.writeFile(tipografiasPath, JSON.stringify(tipografias));
    
    res.status(201).json(nuevaTipografia);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la tipografía", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});