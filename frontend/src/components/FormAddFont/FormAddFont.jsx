import React from 'react'
import { useState } from 'react';

const FormAddFont = ({ onAddFont }) => {

  const CATEGORIES = [
    'Moderna',
    'Elegante',
    'Clasica',
    'Creativa',
  ];

  const STYLES = [
    'normal',
    'italica',
    'subrayada',
    'mayuscula',
  ];

  const WEIGHTS = [
    'normal',
    'bold',
    'bolder',
    'lighter',
  ];

  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const fontData = {
      name,
      size: size + 'px',
      style,
      weight,
      category
    };

    try {
      await onAddFont(fontData);
      
      setName('');
      setSize('');
      setStyle('');
      setWeight('');
      setCategory('');
      
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-primary">+</span> Agregar Tipografía
        </h2>
          

        <form className="space-y-4" onSubmit={handleSubmit}>
            
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de la Tipografía
            </label>
            <input
              value={name}
              onChange={(e) => {setName(e.target.value)}} 
              type="text" 
              placeholder="Ingrese el nombre de la tipografia"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

            
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => {setCategory(e.target.value)}}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

            
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tamaño
            </label>
            <input
              value={size}
              onChange={(e) => {setSize(e.target.value)}} 
              type="number" 
              placeholder="Ingrese el tamaño en px"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

            
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estilo
            </label>
            <select
              value={style}
              onChange={(e) => {setStyle(e.target.value)}}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Selecciona un estilo</option>
              {STYLES.map((style, index) => (
                <option key={index} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Grosor
            </label>
            <select
              value={weight}
              onChange={(e) => {setWeight(e.target.value)}}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Selecciona un grosor</option>
              {WEIGHTS.map((weight, index) => (
                <option key={index} value={weight}>{weight.charAt(0).toUpperCase() + weight.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 space-y-2">
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Agregar Tipografía
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default FormAddFont 