import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registed from './pages/Registed'
import SingUp from './pages/SingUp'

const App = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Registed />} />
        <Route path='/SingUp' element={<SingUp />} />
      </Routes>

    </>
  )
}

export default App