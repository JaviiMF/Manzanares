import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RoomAviable from './components/RoomAviable';
import CrearReserva from './components/Recepcionista/CrearReserva';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Switch } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<Home />} /> 
      <Route path="/room-aviable" element={<RoomAviable />} />
      <Route path="/CrearReserva" element={<CrearReserva/>}/>
      </Routes>      
    </Router>
  );
}

export default App;
