import React from 'react'
import './Explore.css'
import { assets } from '../../assets/assets'

const Explore = () => {
  return (
    <div className='explore' id='explore'>
      <div className="explore-item">
        <div className="image-container">
          <img src={assets.icon} alt="icon" className="icon" />
          <strong>デザート</strong>
          <p>技術の新時代において、私たちは未来を確信し、自信を持って生きています。</p>
          <p className="menu-link">メニューを見る</p>
        </div>
        <div className="image-container">
          <img src={assets.icon2} alt="icon" className="icon" />
          <strong>デザート</strong>
          <p>技術の新時代において、私たちは未来を確信し、自信を持って生きています。</p>
          <p className="menu-link">メニューを見る</p>
        </div>
        <div className="image-container">
          <img src={assets.icon3} alt="icon" className="icon" />
          <strong>デザート</strong>
          <p>技術の新時代において、私たちは未来を確信し、自信を持って生きています。</p>
          <p className="menu-link">メニューを見る</p>
        </div>
        <div className="image-container">
          <img src={assets.icon4} alt="icon" className="icon" />
          <strong>デザート</strong>
          <p>技術の新時代において、私たちは未来を確信し、自信を持って生きています。</p>
          <p className="menu-link">メニューを見る</p>
        </div>
      </div>
</div>

  )
}

export default Explore
