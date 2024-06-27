
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ListaServicios } from './components/Recepcionista/ListaServicios';
import { Clientes } from './components/Recepcionista/Clientes';
import { ListaCliente } from './components/Recepcionista/ListaCliente';
import { EditaCliente } from './components/Recepcionista/EditaCliente';
import RoomAviable from './components/RoomAviable';
import CrearReserva from './components/Recepcionista/CrearReserva';
import { CreaServicio } from './components/Webmaster/CreaServicio';
import { EditaServicio } from './components/Webmaster/EditaServicio';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


function Rutas() {
  return (
<>
      <Router>       
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/gestion-clientes" element={<Clientes/>} />
          <Route path="/clientes" element={<ListaCliente/>}/>
          <Route path="/servicios" element={<ListaServicios/>}/>
          <Route path="/clientes/editar/:dniAux" element={<EditaCliente />} />
          <Route path="/room-aviable" element={<RoomAviable />} />
          <Route path="/CrearReserva" element={<CrearReserva/>}/>
          <Route path="/gestion-servicio" element={<CreaServicio/>}/>
          <Route path="/servicios/editar/:idAux" element={<EditaServicio />} />
        </Routes>     
      </Router>

</>

    
  );
}

export default Rutas;
