import Campos from "../../componentes/forms/Contato";
import { MdEmail } from "react-icons/md";
import "./contato.css"

export default function Contato() {
    return (
        <div className="container-pag-contato">
            <form className="form-contato">
                <Campos />
                <label>Mensagem</label>
                <textarea className="box-mensagem" name="mensagem"></textarea>
                <button>Enviar <MdEmail /></button>
            </form>
        </div>
    );
}