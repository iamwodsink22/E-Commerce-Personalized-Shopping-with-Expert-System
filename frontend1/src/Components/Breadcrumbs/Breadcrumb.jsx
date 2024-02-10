import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import './Breadcrumb.css'
  

const Breadcrumb = ({product}) => {
    
    return (
      <div className='breadcrumb'>
        HOME <img src={arrow_icon} alt="" />SHOP <img src={arrow_icon} alt="" />{product.name} <img src={arrow_icon} alt="" /> {product.name}
        
      </div>
    )
  }

export default Breadcrumb
