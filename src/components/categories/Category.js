import React from 'react'
import './category.css'

export default function Category({category}) {
    const{imageUrl,title,id,price} = category;
  return (
    <div className="card">
       <img src={imageUrl} alt="Denim Jeans" style={{width:"100%"}}/>
     
      <div className="category-container">
        <div className="category-body-container">
          <h2>{title}</h2>
          <p className="price">${price}</p>
          <p><button>Add to Cart</button></p>
        </div>
      </div>
    </div>
  )
}
