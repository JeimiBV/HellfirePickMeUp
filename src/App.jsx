import './App.css'
import Cabecera from './componentes/Cabecera'
import Sidebar from './componentes/Sidebar'
import React, { useState } from 'react'
import { BrowserRouter as Route, Routes, Router} from 'react-router-dom';
import Navpage from "./componentes/Navpage"



function App() {

  //const [valido, setValido] = useState( {estado1: false, estado2: false, estado3: false, estado4: false});


  return (
      <Router>
        
        <NabvarIni/> 
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/loginConsumidor' element={<LoginConsumidor/>}/>
            <Route path='/loginNegocio' element={<LoginNegocio/>}/>
          </Routes>
      </Router>
  )
}

export default App
