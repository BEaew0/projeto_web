import "./card-download.css";

export default function CardDonwload({
    texto,
    azul
 }){
    return (
        //puxar o card e o texto com estilo

        <div className={`card-download ${azul ===true?"card_azul":"card_cinza"}`}>
            <div className="container-texto-card">
                {texto.map((txt,key)=>{
                    return <p key={key}>{txt.p}</p>
                })}

            </div>
        </div>

    );
};