import './App.css'
import Cabecera from './componentes/Cabecera'
import Sidebar from './componentes/Sidebar'
import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NabvarIni from './componentes/CompLand/Navbar';
import Landing from './componentes/Landing'
import LoginConsumidor from './paginas/LoginConsumidor';
import LoginNegocio from './paginas/LoginNegocio';

function App() {

  //const [valido, setValido] = useState( {estado1: false, estado2: false, estado3: false, estado4: false});


  return (
    <div className='App'>
     <Router>
        <NabvarIni/> 
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/loginConsumidor' element={<LoginConsumidor/>}/>
            <Route path='/loginNegocio' element={<LoginNegocio/>}/>
          </Routes>  
      </Router>
    </div>
  )
}

export default App
