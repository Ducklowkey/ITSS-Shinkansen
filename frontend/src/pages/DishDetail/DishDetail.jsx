import React from 'react'
import './DishDetail.css'
import { assets } from '../../assets/assets'

const DishDetail = () => {
  return (
    <div>
      <div className="top">
        <img src={assets.arrow_back} alt=""  />
        <h1>Bún Chả HaNoi</h1>
      </div>
        
        <img src={assets.food5} alt="" className="food5" />
        <p>Bún Chả HaNoi</p>
        
    </div>
  )
}

export default DishDetail
