import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("AåBbCc\n#9½\nƒ%£©∑∅!");
  const [fontFamily, setFontFamily] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[#1a1d2e] text-white font-sans min-h-screen">
      {/* Header */}
      <header className="bg-[#f9d423] text-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">GLYPHA</h1>
              <p className="text-sm mt-1">
                ¡Vamos a encontrar tu tipografía ideal!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {}}
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Explorar
              </button>
              <button
                onClick={() => {}}
                className="bg-transparent border-2 border-black text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
              >
                Para Ti
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Categorías */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Categorías</h2>
            <p className="text-gray-400 text-sm">
              Haz click en una tarjeta para ver las fuentes segun su categoría!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#252841] rounded-2xl p-8 text-white hover:scale-105 transition-transform cursor-pointer">
              <div className="text-5xl font-bold mb-3">Aa</div>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                MODERNA
              </h3>
            </div>
            <div className="bg-[#252841] rounded-2xl p-8 text-white hover:scale-105 transition-transform cursor-pointer">
              <div className="text-5xl font-bold mb-3">Aa</div>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                ELEGANTE
              </h3>
            </div>
            <div className="bg-[#f9d423] rounded-2xl p-8 text-black hover:scale-105 transition-transform cursor-pointer">
              <div className="text-5xl font-bold mb-3">Aa</div>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                CLASICA
              </h3>
            </div>
            <div className="bg-[#f9d423] rounded-2xl p-8 text-black hover:scale-105 transition-transform cursor-pointer">
              <div className="text-5xl font-bold mb-3">Aa</div>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                CREATIVA
              </h3>
            </div>
          </div>
        </section>

        {/* Tipografías en tendencias */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Tipografías en tendencias
            </h2>
            <p className="text-gray-400 text-sm">
              Haz click en una tarjeta para probar las distintas fuentes!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#f9d423] rounded-2xl p-8 text-black hover:scale-105 transition-transform cursor-pointer">
              <div
                className="text-5xl font-bold mb-3"
                style={{ fontFamily: "Sansation, sans-serif" }}
              >
                Aa
              </div>
              <h3
                className="text-lg font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Sansation, sans-serif" }}
              >
                SANSATION
              </h3>
            </div>
            <div className="bg-[#f9d423] rounded-2xl p-8 text-black hover:scale-105 transition-transform cursor-pointer">
              <div
                className="text-5xl font-bold mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Aa
              </div>
              <h3
                className="text-lg font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                PLAYFAIR DISPLAY
              </h3>
            </div>
            <div className="bg-[#252841] rounded-2xl p-8 text-white hover:scale-105 transition-transform cursor-pointer">
              <div
                className="text-5xl font-bold mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Aa
              </div>
              <h3
                className="text-lg font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                ROBOTO
              </h3>
            </div>
            <div className="bg-[#252841] rounded-2xl p-8 text-white hover:scale-105 transition-transform cursor-pointer">
              <div
                className="text-5xl font-bold mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Aa
              </div>
              <h3
                className="text-lg font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                MONTSERRAT
              </h3>
            </div>
          </div>
        </section>

        {/* Prueba de fuente */}
        <section className="mb-12">
          <p className="text-gray-400 text-sm mb-4">
            Proba la fuente en tendencia que mas te guste!
          </p>
          <input
            type="text"
            value={inputText}
            onChange={() => {}}
            className="bg-[#252841] border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 placeholder-gray-500 mb-6"
            placeholder="Escriba aqui para probar la fuente seleccionada."
            maxLength="30"
          />

          <div className="bg-[#252841] rounded-3xl p-16 text-center relative">
            <div
              className="text-[#f9d423] text-7xl font-bold leading-tight mb-6 break-words whitespace-normal w-full"
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
                onClick={() => {}}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
              <button
                onClick={() => {}}
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
            <div className="text-center text-gray-400 text-sm">
              <p className="font-semibold text-white mb-1">Fuentes Favoritas</p>
              <p className="text-xs">playfair display</p>
              <p className="text-xs">roboto</p>
              <p className="text-xs">sansation</p>
            </div>
          </div>
        </section>

        {/* Inspiración semanal */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Inspiración semanal</h2>
          <div className="space-y-4">
            <a
              href="#"
              onClick={() => {}}
              className="flex items-center justify-between p-6 bg-card-bg rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="text-lg">Más usadas</span>
              <svg
                className="w-5 h-5 text-amarillo"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              onClick={() => {}}
              className="flex items-center justify-between p-6 bg-card-bg rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="text-lg">Tendencias</span>
              <svg
                className="w-5 h-5 text-amarillo"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </section>

      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-800 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Sección próximamente
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Estamos trabajando en esta funcionalidad
            </p>

            <button
              onClick={() => {}}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-card-bg mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amarillo mb-4">GLYPHA</h2>
            <p className="text-gray-400">Encuentra tu tipografía ideal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
