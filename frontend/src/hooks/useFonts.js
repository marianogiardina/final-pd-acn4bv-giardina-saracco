import { useState, useEffect, useCallback } from 'react';
import { FontsService } from '../services/fonts';
import { useToast } from '../context/ToastContext';

export const useFonts = () => {
  const [fonts, setFonts] = useState([]);
  const { showToast } = useToast();

  const fetchFonts = useCallback(async () => {
    try {
      const data = await FontsService.getAllFonts();
      setFonts(data);
    } catch (error) {
      console.error("Error al buscar las fuentes:", error);
    }
  }, []);

  const fetchFontsByCategory = useCallback(async (category) => {
    try {
      
      const data = await FontsService.getFontsByCategory(category);
      setFonts(data);

    } catch (error) {
      console.error("Error al buscar las fuentes por categoría:", error);
    }
  }, []);

  const fetchFontById = useCallback(async (id) => {
    try {

      const data = await FontsService.getFontById(id);

      setFonts([data]);
      
    } catch (error) {
      console.error("Error al buscar la fuente por ID:", error);
    }
  }, []);

  useEffect(() => {
    fetchFonts();
  }, [fetchFonts]);

  const handleAddFont = async (newFont) => {
    try {
      const created = await FontsService.createFont(newFont);
      setFonts([...fonts, created]);
      showToast("Tipografía agregada exitosamente", "success");
    } catch (error) {      
      showToast(error.message || "Error al agregar tipografía", "error");
    }
  };

  const handleDeleteFont = async (id) => {
    try {
      await FontsService.deleteFont(id);
      setFonts(fonts.filter((font) => font.id !== id));
      showToast("Tipografía eliminada exitosamente", "success");
    } catch (error) {
      showToast(error.message || "Error al eliminar tipografía", "error");
    }
  };

  const handleUpdateFont = async (id, updatedData) => {
    try {
      const updated = await FontsService.updateFont(id, updatedData);
      setFonts(fonts.map((font) => (font.id === id ? updated : font)));
      showToast("Tipografía actualizada exitosamente", "success");
    } catch (error) {
      showToast(error.message || "Error al actualizar tipografía", "error");
    }
  };

  const handleAddFontToFavorites = async (id) => {
    try {

      await FontsService.addFontToFavorites(id);

      showToast("Tipografía agregada a favoritos exitosamente", "success");

    } catch (error) {
      showToast(error.message || "Error al agregar a favoritos", "error");
    }
  };

  const handleDeleteFontFromFavorites = async (id) => {
    try {
      await FontsService.deleteFontFromFavorites(id);

      showToast("Tipografía eliminada de favoritos exitosamente", "success");
    } catch (error) {
      showToast(error.message || "Error al eliminar de favoritos", "error");
    }
  };

  const handleCheckIfFontIsFavorite = async (id) => {
    try {
      const isFavorite = await FontsService.checkIfFontIsFavorite(id);

      return isFavorite;

    } catch (error) {

      showToast(error.message || "Error al verificar favorito", "error");

      return false;
    }
  };
  return {
    fonts,
    handleAddFont,
    handleDeleteFont,
    handleUpdateFont,
    fetchFontsByCategory,
    fetchFontById,
    handleAddFontToFavorites,
    handleDeleteFontFromFavorites,
    handleCheckIfFontIsFavorite,
  };
};
