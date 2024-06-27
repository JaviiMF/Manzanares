import { BuscaCliente } from './BuscaCliente';
import { AltaCliente } from './AltaCliente';
import './Estilos.css'

export function Clientes() {
    return (
        <div className="margin-div">
            <BuscaCliente/>
            <AltaCliente/>
        </div>  
    )
}
