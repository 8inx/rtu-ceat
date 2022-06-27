import React from 'react';
import './scss/main.scss'

import { BrowserRouter, Switch, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import File from './pages/File';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/file/:id" element={<File replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 