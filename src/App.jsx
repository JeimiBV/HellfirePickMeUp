import './App.css'
import Cabecera from './componentes/Cabecera'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Mostrarmenu from './componentes/Menu';
import Mostraroferta from './componentes/Oferta';



function App() {

  //const [valido, setValido] = useState( {estado1: false, estado2: false, estado3: false, estado4: false});


  return (
      <Router>
        <div className='App'>
            <Cabecera />
           
        </div>
        <div className='Menu'>
             <Routes>

                <Route path= "/menu" element= {<Mostrarmenu/>}/>
                <Route path= "/oferta/:id" element= {<Mostraroferta/>}/>
                
             </Routes>
        </div>
      
       
      </Router>
  )
}

export default App