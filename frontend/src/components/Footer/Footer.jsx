import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#1a1d2e] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#f9d423] mb-3">GLYPHA</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu plataforma para descubrir, explorar y administrar las mejores tipografías del mundo.
            </p>
          </div>


        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © 2025 GLYPHA. Todos los derechos reservados.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer