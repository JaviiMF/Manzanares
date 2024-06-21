<<<<<<< HEAD
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RoomAviable from './components/RoomAviable';
import CrearReserva from './components/Recepcionista/CrearReserva';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Recepcionista/Estilos.css';
import { ListaOfertas } from './components/Recepcionista/ListaOfertas';
import { Clientes } from './components/Recepcionista/Clientes';
import { ListaCliente } from './components/Recepcionista/ListaCliente';
>>>>>>> origin/jaim2psp59

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD

      <Route path="/" element={<Home />} /> 
      <Route path="/room-aviable" element={<RoomAviable />} />
      <Route path="/CrearReserva" element={<CrearReserva/>}/>
      </Routes>      
=======
        <Route path="/" element={<Home />} /> 
        <Route path="/getion-clientes" element={<Clientes/>} />
        <Route path="/clientes" element={<ListaCliente/>}/>
        <Route path="/ofertas" element={<ListaOfertas/>}/>
      </Routes>
>>>>>>> origin/jaim2psp59
    </Router>
  );
}

export default App;
