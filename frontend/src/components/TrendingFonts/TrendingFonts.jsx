import React from "react";

const TrendingFonts = ({ fonts = [], onSelect, selected, className = "" }) => {
    
	if (!fonts || fonts.length === 0) {
		return (
			<div className={`p-6 rounded-2xl bg-[#252841] text-center text-sm text-gray-400 ${className}`}>
				No hay fuentes para mostrar.
			</div>
		);
	}

	return (
		<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
			{fonts.map((font) => {
				const isActive = selected === font.name;
				return (
					<div
						key={font.id}
						className={`rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer border ${isActive ? 'bg-[#f9d423] text-black border-yellow-400' : 'bg-[#252841] text-white border-transparent'}`}
						onClick={() => onSelect && onSelect(font.name)}
						style={{ fontFamily: font.name }}
						aria-pressed={isActive}
					>
						<div className="text-5xl font-bold mb-3" style={{ fontFamily: font.name }}>
							Aa
						</div>
						<h3 className="text-lg font-semibold uppercase tracking-wide" style={{ fontFamily: font.name }}>
							{font.name}
						</h3>
					</div>
				);
			})}
		</div>
	);
};

export default TrendingFonts;
