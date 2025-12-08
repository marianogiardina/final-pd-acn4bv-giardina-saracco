import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { prisma } from "../lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const tipografiasPath = path.join(__dirname, "../data", "tipografias.json");

const validateFontData = (req, res, next) => {
  const { name, size, style, weight, category } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({
        message: "El campo 'Nombre' es requerido y debe ser texto válido",
      });
  }

  if (
    !size ||
    typeof size !== "string" ||
    size.trim() === "" ||
    isNaN(parseInt(size)) ||
    parseInt(size) <= 0
  ) {
    return res
      .status(400)
      .json({
        message: "El campo 'Tamaño' es requerido y debe ser un numero positivo",
      });
  }

  if (!style || typeof style !== "string") {
    return res.status(400).json({ message: "El campo 'Estilo' es requerido" });
  }

  if (!weight || typeof weight !== "string") {
    return res.status(400).json({ message: "El campo 'Grosor' es requerido" });
  }

  if (!category || typeof category !== "string") {
    return res
      .status(400)
      .json({ message: "El campo 'Categoría' es requerido" });
  }

  next();
};

router.get("/", async (req, res) => {
  try {
    const tipografias = await prisma.font.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(tipografias);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al leer las tipografías", error: error.message });
  }
});

router.post("/", validateFontData, async (req, res) => {
  try {
    const nuevaTipografia = await prisma.font.create({
      data: {
        name: req.body.name,
        size: req.body.size,
        style: req.body.style,
        weight: req.body.weight,
        category: req.body.category,
      },
    });

    res.status(201).json(nuevaTipografia);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error al agregar la tipografía",
        error: error.message,
      });
  }
});

router.put("/:id", validateFontData, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updatedFont = await prisma.font.update({
      where: { id },
      data: {
        name: req.body.name,
        size: req.body.size,
        style: req.body.style,
        weight: req.body.weight,
        category: req.body.category,
      },
    });

    res.json(updatedFont);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar la tipografía",
        error: error.message,
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedFont = await prisma.font.delete({
      where: { id },
    });

    res.json({
      message: "Tipografía eliminada correctamente",
      font: deletedFont,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar la tipografía",
        error: error.message,
      });
  }
});

export default router;
