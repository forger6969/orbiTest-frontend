import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import DotGrid from '../Components/DotGrid';

const Home = () => {



  return (
<div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
  
  <div
    style={{
      position: 'absolute',
      inset: 0,         
      zIndex: 0,
    }}
  >
    <DotGrid
      dotSize={1.5}
      gap={15}
      baseColor="#d9d7d9"
      activeColor="#3300ff"
      proximity={120}
      shockRadius={100}
      shockStrength={15}
      resistance={950}
      returnDuration={1.5}
    />
  </div>

  <div style={{ position: 'relative',backgroundColor: 'white', zIndex: 1 }}>
    <Header />
  </div>
</div>

  )
}

export default Home