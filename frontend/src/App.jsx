import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Landing from './pages/Landing/Landing'
import DishDetail from './pages/DishDetail/DishDetail'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          
          <Route path="/dish" element={<DishDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
