
import "./card-planos.css"

export default function Card_planos({ branco, titulo, texto ,valor, button }) {
    return (
        <div className={`card-planos ${branco? "card-azul" : "card-azul"}`}>
            <h1>{titulo}</h1>
             <p>Valor:{valor}</p>
            <p>{texto}</p>
           
             {button && (<button className="btn_obter">Obter </button>)}
   
        </div>
    );
}