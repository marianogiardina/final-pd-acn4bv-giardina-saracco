import React from 'react'
import { useState } from 'react';
import FormSelect from '../Select/FormSelect';

const FormAddFont = ({ onAddFont }) => {

  const CATEGORIES = [
    'Moderna',
    'Elegante',
    'Clasica',
    'Creativa',
  ];

  const STYLES = [
    'normal',
    'italic',
    'oblique',
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
            
          <FormSelect
            label="Categoría"
            value={category}
            onChange={setCategory}
            options={CATEGORIES}
            placeholder="Selecciona una categoría"
          />
            
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
            
          <FormSelect
            label="Estilo"
            value={style}
            onChange={setStyle}
            options={STYLES}
            placeholder="Selecciona un estilo"
          />

          <FormSelect
            label="Grosor"
            value={weight}
            onChange={setWeight}
            options={WEIGHTS}
            placeholder="Selecciona un grosor"
          />

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