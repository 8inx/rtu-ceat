import React from 'react';
import './scss/main.scss'

import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/about" element={<About/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App; 