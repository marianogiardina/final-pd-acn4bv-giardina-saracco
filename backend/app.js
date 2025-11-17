const express = require('express');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

const tipografias = [
  { "id": 1, "nombre": "Sansation" },
  { "id": 2, "nombre": "Playfair Display" },
  { "id": 3, "nombre": "Roboto" },
  { "id": 4, "nombre": "Montserrat" }
]

app.get('/', (req, res) => {
  res.send('Hola soy juan:)');
});

app.get('/api/fonts', (req, res) => {
  res.json(tipografias);
});

app.post('/api/fonts', (req, res) => {

  try{

    const nuevaTipografia = { "id": tipografias.length + 1, "nombre": `${req.body.nombre}` };
    tipografias.push(nuevaTipografia);
    res.status(201).json(nuevaTipografia);

  }catch(error){
    res.status(400).json({ message: "Error al agregar la tipografia", error: error.message });
  }

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});