import "./card.css";

export default function Card({ cinza, titulo, texto , button }) {
    return (
        <div className={`card-inicial ${cinza ? "card-cinza" : "card-azul"}`}>
            <h1>{titulo}</h1>
            <p>{texto}</p>
   
        </div>
    );
}