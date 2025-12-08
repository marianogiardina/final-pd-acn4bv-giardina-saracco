import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Category = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <div className="bg-[#030712] text-white font-sans min-h-screen">
            
            <main className="max-w-4xl mx-auto px-6 py-12 ">
                <div className="space-y-12">
                        
                    <div className="space-y-4">
                        <h1 className="text-6xl font-bold text-primary leading-tight tracking-tight">
                            TIPOS {category?.toUpperCase()}
                        </h1>
                        <p className="text-xl text-gray-400 tracking-widest"> Haz click en una fuente para verla en detalle </p>
                    </div>

                    
                    <div className="space-y-px">
                            
                        <div className=" border-b border-yellow-500 hover:border-gray-700 transition-colors">
                            <div className="flex items-center justify-between p-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-primary tracking-wide">SPACE GROTESK</h3>
                                    <p className="text-sm text-gray-500">Sans Serif | 8 variantes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="w-10 h-10 rounded-full border border-gray-700 hover:border-primary flex items-center justify-center text-gray-400 hover:text-primary transition-all" title="Más información">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all" title="Ver detalles">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                            
                        <div className="border-b border-yellow-500 hover:border-gray-700 transition-colors">
                            <div className="flex items-center justify-between p-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-primary tracking-wide">INTER</h3>
                                    <p className="text-sm text-gray-500">Sans Serif | 18 variantes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="w-10 h-10 rounded-full border border-gray-700 hover:border-primary flex items-center justify-center text-gray-400 hover:text-primary transition-all" title="Más información">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all" title="Ver detalles">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Category