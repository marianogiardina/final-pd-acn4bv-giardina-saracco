import React from 'react'
import Button from '../Button/Button'

const FontByCategoryCard = ({font}) => {
  return (
    <div className=" border-b border-yellow-500 hover:border-gray-700 transition-colors">
        <div className="flex items-center justify-between p-6">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-primary tracking-wide" style={{
                    fontFamily: font.name,
                    fontSize: font.size,
                    fontStyle: font.style,
                    fontWeight: font.weight,
                  }}>{font.name}</h3>
                <p className="text-sm text-gray-500">{font.style} | {font.weight}</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-700 hover:border-primary flex items-center justify-center text-gray-400 hover:text-primary transition-all" title="Más información">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <Button icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                }/>
            </div>
        </div>
    </div>
  )
}

export default FontByCategoryCard