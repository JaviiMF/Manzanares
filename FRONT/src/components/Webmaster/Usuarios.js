import { BuscaUsuario } from './BuscaUsuario';
import { AltaUsuario } from './AltaUsuario';
import './Estilos.css'

export function Usuarios() {
    return (
        <div className="margin-div">
            <BuscaUsuario/>
            <AltaUsuario/>
        </div>  
    )
}
