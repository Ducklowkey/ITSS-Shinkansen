import React from 'react'
import Explore from '../../components/Explore/Explore'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Header from '../../components/Header/Header'
import './Landing.css'

const Landing = () => {
  return (
    <div>
     
      <Header/>
      <Explore/>
      <FoodDisplay/>
    </div>
  )
}

export default Landing
