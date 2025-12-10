import { useState, useEffect } from 'react';
import { FontsService } from '../services/fonts';

export const useFonts = () => {
  const [fonts, setFonts] = useState([]);

  const fetchFonts = async () => {
    try {
      const data = await FontsService.getAllFonts();
      setFonts(data);
    } catch (error) {
      console.error("Error al buscar las fuentes:", error);
    }
  };

  const fetchFontsByCategory = async (category) => {
    try {
      
      const data = await FontsService.getFontsByCategory(category);
      setFonts(data);

    } catch (error) {
      console.error("Error al buscar las fuentes por categoría:", error);
    }
  };

  const fetchFontById = async (id) => {
    try {

      const data = await FontsService.getFontById(id);

      setFonts([data]);
      
    } catch (error) {
      console.error("Error al buscar la fuente por ID:", error);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  const handleAddFont = async (newFont) => {
    try {
      const created = await FontsService.createFont(newFont);
      setFonts([...fonts, created]);
      alert("Tipografía agregada exitosamente");
    } catch (error) {      
      alert(error.message);
    }
  };

  const handleDeleteFont = async (id) => {
    try {
      await FontsService.deleteFont(id);
      setFonts(fonts.filter((font) => font.id !== id));
      alert("Tipografía eliminada exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateFont = async (id, updatedData) => {
    try {
      const updated = await FontsService.updateFont(id, updatedData);
      setFonts(fonts.map((font) => (font.id === id ? updated : font)));
      alert("Tipografía actualizada exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddFontToFavorites = async (id) => {
    try {

      await FontsService.addFontToFavorites(id);

      alert("Tipografía agregada a favoritos exitosamente");

    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteFontFromFavorites = async (id) => {
    try {
      await FontsService.deleteFontFromFavorites(id);

      alert("Tipografía eliminada de favoritos exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCheckIfFontIsFavorite = async (id) => {
    try {
      const isFavorite = await FontsService.checkIfFontIsFavorite(id);

      return isFavorite;

    } catch (error) {

      alert(error.message);

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
