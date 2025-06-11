import "./card-planos.css"

export default function Card_planos({ branco, titulo, texto, valor, button }) {
    return (
        <div className={`card-planos ${branco ? "card-azul" : "card-azul"}`}>
            <h1>{titulo}</h1>
            
            <ul className="beneficios-lista">
                {texto.map((beneficio) => (
                    <li key={beneficio.id}>• {beneficio.item}</li>
                ))}
            </ul>
             <p className="valor">Valor:R$ {valor.toFixed(2).replace('.', ',')}</p>
           
            {button && (<button className="btn_obter">Obter</button>)}
        </div>
    );
}