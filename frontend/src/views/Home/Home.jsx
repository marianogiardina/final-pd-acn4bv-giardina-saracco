import React, { useState, useEffect } from "react";
import { FontsService } from "../../services/fonts";
import TrendingFonts from "../../components/TrendingFonts/TrendingFonts";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("AåBbCc\n#9½\nƒ%£©∑∅!");
  const [fontFamily, setFontFamily] = useState("");
  const [fonts, setFonts] = useState([]);
  const [favoriteFonts, setFavoriteFonts] = useState([]);

  // Cargar favoritos del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('favoriteFonts');
    if (saved) {
      setFavoriteFonts(JSON.parse(saved));
    }
  }, []);

  // Función para agregar/quitar favorito
  const toggleFavorite = () => {
    if (!fontFamily) return;
    
    let updatedFavorites;
    if (favoriteFonts.includes(fontFamily)) {
      updatedFavorites = favoriteFonts.filter(f => f !== fontFamily);
    } else {
      updatedFavorites = [...favoriteFonts, fontFamily];
    }
    
    setFavoriteFonts(updatedFavorites);
    localStorage.setItem('favoriteFonts', JSON.stringify(updatedFavorites));
  };

  // Funcion para cargar fuentes desde Google Fonts
  const loadGoogleFont = (fontName) => {
    const formattedName = fontName.replace(/ /g, '+');
    const linkId = `google-font-${formattedName}`;
    
    // Evita cargar la misma fuente
    if (document.getElementById(linkId)) return;
    
    const link = document.createElement('link');
    link.id = linkId;
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  const fetchFonts = async () => {
    try {
      const data = await FontsService.getAllFonts();
      setFonts(data);
      
      // Cargar todas las fuentes de Google Fonts
      data.forEach(font => {
        loadGoogleFont(font.name);
      });
    } catch (error) {
      console.error("Error fetching fonts:", error);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return (
    <div className="bg-[#030712] text-white font-sans min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-10">
       
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Tipografías en tendencias
            </h2>
            <p className="text-gray-400 text-sm">
              Haz click en una tarjeta para probar las distintas fuentes!
            </p>
          </div>

          <TrendingFonts fonts={fonts} onSelect={(name) => setFontFamily(name)} />
            
        </section>

        <section className="mb-12">
          <p className="text-gray-400 text-sm mb-4">
            Proba la fuente en tendencia que mas te guste!
          </p>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setDisplayText(e.target.value || "AåBbCc\n#9½\nƒ%£©∑∅!");
            }}
            className="bg-[#252841] border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 placeholder-gray-500 mb-6"
            placeholder="Escriba aqui para probar la fuente seleccionada."
            maxLength="30"
          />

          <div className="bg-[#252841] rounded-3xl p-16 text-center relative">
            <div
              className="text-[#f9d423] text-7xl font-bold leading-tight mb-6 whitespace-normal w-full"
              style={{
                fontFamily: fontFamily || "Sansation, sans-serif",
                whiteSpace: "pre-line",
              }}
            >
              {displayText}
            </div>
            <div className="flex justify-center gap-3 mb-8">
              <button
                className="w-10 h-10 bg-[#1a1d2e] rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                onClick={toggleFavorite}
                disabled={!fontFamily}
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    fontFamily && favoriteFonts.includes(fontFamily) 
                      ? 'text-[#f9d423] fill-current' 
                      : 'text-white'
                  }`}
                  fill={fontFamily && favoriteFonts.includes(fontFamily) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setInputText("");
                  setDisplayText("AåBbCc\n#9½\nƒ%£©∑∅!");
                }}
                className="w-10 h-10 bg-[#1a1d2e] rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

          </div>
        </section>

        <section className="mb-16">
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
                    <svg className="w-4 h-4 text-[#f9d423] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span style={{ fontFamily: font }}>{font}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm text-center">No tienes fuentes favoritas aún. ¡Selecciona una fuente y presiona la estrella!</p>
            )}
          </div>
        </section>
      </main>

    </div>
  );
};

export default Home;
