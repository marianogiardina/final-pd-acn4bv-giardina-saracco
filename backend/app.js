import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fontsRouter from './routes/fonts.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

// Rutas
app.use("/api/fonts", fontsRouter);
app.use("/api/auth", authRouter);

// Health check
app.get("/health", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
