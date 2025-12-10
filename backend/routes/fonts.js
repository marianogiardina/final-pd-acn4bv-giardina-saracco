import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { prisma } from "../lib/prisma.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();



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

router.get("/:id", async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const tipografia = await prisma.font.findUnique({
      where: { id },
    });

    if (!tipografia) {

      return res
        .status(404)
        .json({ message: "Tipografía no encontrada" });

    }
    res.json(tipografia);

  } catch (error) {

    res
      .status(500)
      .json({
        message: "Error al obtener la tipografía por ID",
        error: error.message,
      });
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

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    
    const tipografias = await prisma.font.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });

    res.json(tipografias);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las tipografías por categoría",
        error: error.message,
      });
  }
});

//Comprobar si una fuente está en favoritos
router.get("/:id/is-favorite", authMiddleware, async (req, res) => {
  try {
    const fontId = parseInt(req.params.id);

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { fonts: true },
    });

    const isFavorite = user.fonts.some((font) => font.id === fontId);

    res.json({ isFavorite });

  } catch (error) {

    res.status(500).json({
      message: "Error al comprobar si la tipografía está en favoritos",
      error: error.message,
    });

  }
});

// Agregar fuente a favoritos
router.post("/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const fontId = parseInt(req.params.id);
    const userId = req.user.id;

    
    const font = await prisma.font.findUnique({
      where: { id: fontId },
    });

    if (!font) {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }

    
    await prisma.user.update({
      where: { id: userId },
      data: {
        fonts: {
          connect: { id: fontId },
        },
      },
    });

    res.json({ message: "Tipografía agregada a favoritos exitosamente" });

  } catch (error) {

    res.status(500).json({

      message: "Error al agregar a favoritos",

      error: error.message,
    });

  }
});

//Eliminar fuente de favoritos
router.delete("/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const fontId = parseInt(req.params.id);
    const userId = req.user.id;

    const font = await prisma.font.findUnique({
      where: { id: fontId },
    });

    if (!font) {
      return res.status(404).json({ message: "Tipografía no encontrada" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        fonts: {
          disconnect: { id: fontId },
        },
      },
    });

    res.json({ message: "Tipografía eliminada de favoritos exitosamente" });

  } catch (error) {

    res.status(500).json({

      message: "Error al eliminar de favoritos",

      error: error.message,
    });

  }
});

export default router;
