import FormAddFont from "../FormAddFont/FormAddFont";
import Table from "../table/table";
import { FontsService } from "./../../services/fonts";
import { useEffect, useState } from "react";

const Dashboard = () => {
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

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Header */}

      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-accent">GLYPHA</h1>
              <p className="text-sm text-gray-400">Panel de Administración</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Admin</span>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FormAddFont */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <FormAddFont onAddFont={handleAddFont} />

          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              {/* Buscador y filtros */}

              <h2 className="text-2xl font-bold">Tipografías Registradas</h2>
              <div className="flex items-center gap-2">
                <input
                  type="search"
                  placeholder="Buscar tipografía..."
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium whitespace-nowrap">
                Todas (24)
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm whitespace-nowrap transition-colors">
                Modernas (8)
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm whitespace-nowrap transition-colors">
                Contemporáneas (10)
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm whitespace-nowrap transition-colors">
                Clásicas (6)
              </button>
            </div>

            {/* Cards Tipografias */}

            <div>
              <Table
                fonts={fonts}
                onDelete={handleDeleteFont}
                onUpdate={handleUpdateFont}
              />
            </div>

            {/* paginado */}

            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Mostrando 1-6 de 24 tipografías
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-gray-800 text-gray-500 rounded-lg text-sm cursor-not-allowed">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  2
                </button>
                <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  3
                </button>
                <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
