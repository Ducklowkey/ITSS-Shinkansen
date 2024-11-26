import React from 'react'
import Explore from '../../components/Explore/Explore'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Header from '../../components/Header/Header'
import './Home.css'

const home = () => {
  return (
    <div>
     
      <Header/>
      <Explore/>
      <FoodDisplay/>
    </div>
  )
}

export default home
