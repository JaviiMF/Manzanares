import { AltaHabitacion } from './AltaHabitacion';
import './Estilos.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function Habitaciones() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));

    useEffect(() => {       
        if (tipo !== "administrador") {       
            navigate('/error');
        }
    }, [navigate]); 

    return (
        <AltaHabitacion/>
    )
}
