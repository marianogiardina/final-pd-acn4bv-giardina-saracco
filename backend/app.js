const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');

const fontsRouter = require('./routes/fonts');


const app = express();
const port = 3000;



// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

app.use('/api/fonts', fontsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});