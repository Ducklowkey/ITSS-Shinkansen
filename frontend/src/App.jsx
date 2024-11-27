import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import DishDetail from './pages/DishDetail/DishDetail'
import Search from './pages/Search/Search'

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dish" element={<DishDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
