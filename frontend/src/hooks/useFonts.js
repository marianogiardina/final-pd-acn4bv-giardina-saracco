import { useState, useEffect } from 'react';
import { FontsService } from '../services/fonts';

export const useFonts = () => {
  const [fonts, setFonts] = useState([]);

  const fetchFonts = async () => {
    try {
      const data = await FontsService.getAllFonts();
      setFonts(data);
    } catch (error) {
      console.error("Error fetching fonts:", error);
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

  return {
    fonts,
    handleAddFont,
    handleDeleteFont,
    handleUpdateFont
  };
};
