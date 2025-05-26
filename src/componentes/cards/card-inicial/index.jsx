import "./card.css";

export default function Card({ cinza, titulo, texto }) {
    return (
        <div className={`card-inicial ${cinza ? "card-cinza" : "card-azul"}`}>
            <h1>{titulo}</h1>
            <p>{texto}</p>

            <button className="btn_planos">Ver Planos</button>
        </div>
    );
}