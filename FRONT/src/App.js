import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Recepcionista/Estilos.css';
import { Clientes } from './components/Recepcionista/Clientes';
import { ListaCliente } from './components/Recepcionista/ListaCliente';
import RoomAviable from './components/RoomAviable';
import CrearReserva from './components/Recepcionista/CrearReserva';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ListaReserva from './components/Recepcionista/ListaReserva';
import EditarReserva from './components/Recepcionista/EditarReserva';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/gestion-clientes" element={<Clientes />} />
            <Route path="/clientes" element={<ListaCliente />} />
            <Route path="/room-aviable" element={<RoomAviable />} />
            <Route path="/CrearReserva" element={<CrearReserva />} />
            <Route path="/ListaReserva" element={<ListaReserva />} />
            <Route path="/editarReserva/:idReserva" element={<EditarReserva />} />
            
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
