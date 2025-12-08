import React from 'react'

const CategoryCard = ({category}) => {
  return (
     
    <div className="rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer border bg-[#252841] text-white border-transparent">
        <div className="text-5xl font-bold mb-3">
            {category.charAt(0).toUpperCase() + category.charAt(1)}
        </div>
        <h3 className="text-lg font-semibold uppercase tracking-wide" >
            {category}
        </h3>
    </div>
    
  )
}

export default CategoryCard