import React from 'react'

const FormInput = ({ value, onChange, type, placeholder }) => {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
            Tamaño
        </label>
        <input
            value={value}
            onChange={(e) => {onChange(e.target.value)}} 
            type={type} 
            placeholder={placeholder}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
    </div>
  )
}

export default FormInput