
import React, { use, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom';
import { useFonts } from '../../hooks/useFonts';
import FontTester from '../../components/FontTester/FontTester';

const TestFont = () => {

    const [searchParams] = useSearchParams();
    const fontId = searchParams.get('fontId');

    if (!fontId) {
        return <Navigate to="/" replace />;
    }

    const { fonts, fetchFontById } = useFonts();

    const font = fonts[0];

    useEffect(() => {

        if (fontId) {
            fetchFontById(fontId);
        }

    }, [font, fetchFontById]);


    if (!fonts || fonts.length === 0) {
        return (
            <div className="bg-[#030712] text-white font-sans min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-400">Cargando fuente...</p>
            </div>
        );
    }


    return (
        <div className="bg-[#030712] text-white font-sans min-h-screen">
            <div className=" max-w-6xl mx-auto px-6 py-12">
                
                <div className="space-y-8 mb-16">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <h1 className="text-7xl font-bold text-primary leading-tight tracking-tight" style={{fontFamily: font.name || 'Inter, sans-serif'}}>
                                {font.name}
                            </h1>
                            <p className="text-xl text-gray-400">{font.category || 'Sans Serif'}</p>
                        </div>
                        
                        <button id="favoriteBtn" className="flex items-center gap-2 px-6 py-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold transition-all rounded">
                            <svg id="heartIcon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span id="favoriteText">Agregar a Favoritos</span>
                        </button>
                    </div>

                    
                    
                </div>

                <FontTester
                    fontFamily={font.name}
                    showFavoriteButton={false}
                    showClearButton={false}
                    showControls={true}
                    placeholder="Escribe aquí para probar la fuente..."
                    defaultText="El rápido zorro marrón salta sobre el perro perezoso"
                />

                
                <section className="space-y-6 mb-16">
                    <h2 className="text-2xl font-bold text-primary">ESTILOS Y VARIANTES</h2>
                    
                    <div className="space-y-4">
                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Light (300)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 300}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Regular (400)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 400}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Medium (500)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 500}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">SemiBold (600)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 600}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Bold (700)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 700}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        
                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">ExtraBold (800)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 800}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>

                        <div className="bg-dark-light border border-gray-800 p-6 hover:border-yellow-500 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Black (900)</span>
                            </div>
                            <p className="text-3xl" style={{fontFamily: font.name, fontWeight: 900}}>
                                El rápido zorro marrón salta sobre el perro perezoso
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6 mb-16">
                    <h2 className="text-2xl font-bold text-primary">CONJUNTO DE CARACTERES</h2>
                    <div className="bg-dark-light border border-gray-800 rounded-lg p-8">
                        <div className="space-y-8">
                            <div>
                                <p className="text-sm text-gray-400 mb-3">Mayúsculas</p>
                                <p className="text-3xl tracking-wider" style={{fontFamily: font.name, fontWeight: 500}}>
                                    A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-3">Minúsculas</p>
                                <p className="text-3xl tracking-wider" style={{fontFamily: font.name, fontWeight: 500}}>
                                    a b c d e f g h i j k l m n ñ o p q r s t u v w x y z
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-3">Números</p>
                                <p className="text-3xl tracking-wider" style={{fontFamily: font.name, fontWeight: 500}}>
                                    0 1 2 3 4 5 6 7 8 9
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-3">Símbolos</p>
                                <p className="text-3xl tracking-wider" style={{fontFamily: font.name, fontWeight: 500}}>
                                    ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : ' " , . / ? \ | ` ~
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default TestFont
