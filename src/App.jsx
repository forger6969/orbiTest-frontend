import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registed from './pages/Registed'

const App = () => {
  return (
    <>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/Regist' element={<Registed />}/>

      </Routes>

    </>
  )
}

export default App