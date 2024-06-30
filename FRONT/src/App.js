import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Recepcionista/Estilos.css';
import { Clientes } from './components/Recepcionista/Clientes';
import { Usuarios } from './components/Webmaster/Usuarios';
import { Habitaciones } from './components/Webmaster/Habitaciones';
import { Servicios } from './components/Webmaster/Servicios';
import { ListaUsuario } from './components/Webmaster/ListaUsuario';
import { ListaHabitacion } from './components/Webmaster/ListaHabitacion';
import { ListaCliente } from './components/Recepcionista/ListaCliente';
import { ListaServicios } from './components/Recepcionista/ListaServicios';
import { EditaCliente } from './components/Recepcionista/EditaCliente';
import RoomAviable from './components/RoomAviable';
import CrearReserva from './components/Recepcionista/CrearReserva';
import { EditaServicio } from './components/Webmaster/EditaServicio';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register  from './components/Register/Register';
import ListaReserva from './components/Recepcionista/ListaReserva';
import EditarReserva from './components/Recepcionista/EditarReserva';
import Perfil from './components/Perfil/Perfil';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>

            <Route path="/" element={<Home />} /> 
            <Route path='/Login' element={<Login/>}/> 
            <Route path='/Register' element={<Register/>}/> 
            <Route path="/gestion-clientes" element={<Clientes/>} />
            <Route path="/clientes" element={<ListaCliente/>}/>
            <Route path="/servicios" element={<ListaServicios/>}/>
            <Route path="/clientes/editar/:dniAux" element={<EditaCliente />} />
            <Route path="/gestion-usuarios" element={<Usuarios/>}/>
            <Route path="/usuarios" element={<ListaUsuario/>}/>
            <Route path="/gestion-habitaciones" element={<Habitaciones/>} />
            <Route path="/habitaciones" element={<ListaHabitacion/>}/>
            <Route path="/gestion-servicios" element={<Servicios/>} />
            <Route path="/room-aviable" element={<RoomAviable />} />
            <Route path="/CrearReserva" element={<CrearReserva/>}/>
            <Route path="/servicios/editar/:idAux" element={<EditaServicio />} />
            <Route path="/ListaReserva" element={<ListaReserva />} />
            <Route path="/editarReserva/:idReserva" element={<EditarReserva />} />
            <Route path="/Perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;