import React from 'react'
import { useState } from 'react';
import FormSelect from '../Select/FormSelect';
import FormInput from '../Input/FormInput';
import { Form } from 'react-router-dom';

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
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 h-fit">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-primary">+</span> Agregar Tipografía
        </h2>
          

        <form className="space-y-4" onSubmit={handleSubmit}>
            

          <FormInput
            value={name}
            onChange={setName}
            type="text"
            placeholder="Ingrese el nombre de la tipografia"
          />
            
          <FormSelect
            label="Categoría"
            value={category}
            onChange={setCategory}
            options={CATEGORIES}
            placeholder="Selecciona una categoría"
          />

          <FormInput
            value={size}
            onChange={setSize}
            type="number"
            placeholder="Ingrese el tamaño en px"
          />
             
          
            
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
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-colors"
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