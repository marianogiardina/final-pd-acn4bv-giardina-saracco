import React, { use, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FontByCategoryCard from '../../components/Cards/FontByCategoryCard';
import { useFonts } from '../../hooks/useFonts';

const Category = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const { fetchFontsByCategory, fonts } = useFonts();

    useEffect(() => {
        fetchFontsByCategory(category);
    }, [category]);

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
                        {fonts.length === 0 ? (
                            <p className="text-gray-400">No se encontraron fuentes en esta categoría.</p>
                        ) : (
                             
                            fonts.map((font) => (
                                <FontByCategoryCard key={font.id} font={font} />
                            ))
                        )}

                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Category