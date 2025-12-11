import React, { useState, useEffect } from "react";
import TrendingFonts from "../../components/TrendingFonts/TrendingFonts";
import { useFonts } from "../../hooks/useFonts";
import CategoryCard from "../../components/Cards/CategoryCard";
import FontTester from "../../components/FontTester/FontTester";

const Home = () => {
  const [fontFamily, setFontFamily] = useState("");
  const [favoriteFonts, setFavoriteFonts] = useState([]);

  const CATEGORIES = ["Moderna", "Elegante", "Clasica", "Creativa"];

  const { fonts } = useFonts();

  const toggleFavorite = () => {
    if (!fontFamily) return;

    let updatedFavorites;
    if (favoriteFonts.includes(fontFamily)) {
      updatedFavorites = favoriteFonts.filter((f) => f !== fontFamily);
    } else {
      updatedFavorites = [...favoriteFonts, fontFamily];
    }

    setFavoriteFonts(updatedFavorites);
    localStorage.setItem("favoriteFonts", JSON.stringify(updatedFavorites));
  };


  useEffect(() => {
    const saved = localStorage.getItem("favoriteFonts");
    if (saved) {
      setFavoriteFonts(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="bg-[#030712] text-white font-sans min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-10">

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Categorias
            </h2>
            <p className="text-gray-400 text-sm">
              Haz click en una tarjeta para ver las diferentes fuentes por categoria!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category} category={category} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Tipografías en tendencias
            </h2>
            <p className="text-gray-400 text-sm">
              Haz click en una tarjeta para probar las distintas fuentes!
            </p>
          </div>

          <TrendingFonts
            fonts={fonts.slice(0, 4)}
            onSelect={(name) => setFontFamily(name)}
          />
        </section>

        <FontTester
          fontFamily={fontFamily || "Sansation, sans-serif"}
          onFavoriteToggle={toggleFavorite}
          isFavorite={fontFamily && favoriteFonts.includes(fontFamily)}
          showFavoriteButton={true}
          showClearButton={true}
          description="Proba la fuente en tendencia que mas te guste!"
          placeholder="Escriba aqui para probar la fuente seleccionada."
          defaultText={`AåBbCc\n#9½\nƒ%£©∑∅!`}
          maxLength={30}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Fuentes Favoritas</h2>
          <div className="bg-[#252841] rounded-2xl p-6">
            {favoriteFonts.length > 0 ? (
              <ul className="space-y-2">
                {favoriteFonts.map((font, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-sm flex items-center gap-2 hover:text-[#f9d423] transition-colors cursor-pointer"
                    onClick={() => setFontFamily(font)}
                  >
                    <svg
                      className="w-4 h-4 text-[#f9d423] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span style={{ fontFamily: font }}>{font}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No tienes fuentes favoritas aún. ¡Selecciona una fuente y
                presiona la estrella!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
