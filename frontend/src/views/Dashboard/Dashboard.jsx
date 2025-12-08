import { Link } from "react-router-dom";
import FormFont from "../../components/FormAddFont/FormFont";
import Table from "../../components/table/Table";
import { useState } from "react";
import { Pagination } from "../../components/Pagination/Pagination";
import { useFonts } from "../../hooks/useFonts";

const Dashboard = () => {
  const { fonts, handleAddFont, handleDeleteFont, handleUpdateFont } = useFonts();

  const [fontToEdit, setFontToEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calcular las tipografías para la página actual
  const indexOfLastFont = currentPage * itemsPerPage;
  const indexOfFirstFont = indexOfLastFont - itemsPerPage;
  const currentFonts = fonts.slice(indexOfFirstFont, indexOfLastFont);

  return (
    <div className="bg-gray-950 text-gray-100 p-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <FormFont 
            onAddFont={handleAddFont} 
            onUpdateFont={handleUpdateFont} 
            fontToEdit={fontToEdit}
            onCancelEdit={() => setFontToEdit(null)}
          />

          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tipografías Registradas</h2>
            </div>

            <div>
              <Table
                fonts={currentFonts}
                onDelete={handleDeleteFont}
                onUpdate={setFontToEdit}
              />
            </div>

            <Pagination
              item="tipografías"
              currentPage={currentPage}
              totalItems={fonts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
