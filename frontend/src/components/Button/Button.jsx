import React from 'react'

const Button = ({ icon, onClick, text, type = 'button', width,  variant }) => {
  return (
    <button
      type={type}
      className={`h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors min-w-7
        ${(width || text ) ? 'w-20' : ''}
        ${variant === 'primary' ? 'bg-blue-400 hover:bg-blue-500 text-white' : ''}
        ${variant === 'delete' ? '  hover:bg-red-300' : ''}
         ${variant === 'edit' ? ' hover:bg-orange-300' : ''}
        `}
      onClick={onClick}
    >
      {icon ?? text}
    </button>
  )
}

export default Button