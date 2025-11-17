const express = require('express');
const { db } = require('./firebase');

const app = express();
const port = 3000;

app.get('/',  async (req, res) => {

  const snapshot = await db.collection('tipografias').get();

  console.log(snapshot.docs[0].data());

  res.send('Hola soy juan:)');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});