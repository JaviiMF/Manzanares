import { BuscaCliente } from './BuscaCliente';
import { AltaCliente } from './AltaCliente';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Estilos.css'

export function Clientes() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));

    useEffect(() => {       
        if (tipo === "cliente") {       
            navigate('/error');
        }
    }, [navigate]); 

    return (
        <div className="margin-div">
            <BuscaCliente/>
            <AltaCliente/>
        </div>  
    )
}
