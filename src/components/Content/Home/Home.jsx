import React from 'react'

import './HomeStyle.css'

const Home = () => {
  return (
    <div className='home'>
      <div className='home-welcome-banner'>
        All things finance, <br />
        right here.
        <div className='home-welcome-banner-subline'>Built for a growwing India.</div>
      </div>
      <div class="home-loader">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
      </div>
    </div>
  )
}

export default Home