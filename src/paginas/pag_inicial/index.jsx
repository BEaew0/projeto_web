import Card from "../../componentes/cards/card-inicial";
import Exemplo from "../../assets/Imagens/undraw_data-trends_kv5v.svg";
import { useNavigate } from "react-router-dom";
import "./pag.css";

const cards = [{


    cinza: false,
    titulo: "Controle\n"+" seu estoque\n"+"sem complicação!",
    texto: "O TesouroAzul simplifica o controle.\n" +
           "Evita perdas e desorganização.\n" +
           "Com ferramentas intuitivas você gerencia produtos.\n" +
           "Mantém seu negócio sempre no azul – sem dor de cabeça!",
    button: true,
    buttonText: "Ver planos"
}];

export default function Pag_inicial() {
    const navigate = useNavigate();

    const handleVerPlanosClick = () => {
        navigate("/planos"); 
    };
    
    return (
        <div className="main-content">
            <div className="cards-container">
                {cards.map((card, key) => (
                    <Card 
                        key={key}
                        cinza={card.cinza} 
                        titulo={card.titulo}
                        texto={card.texto} 
                        button={card.button}
                        buttonText={card.buttonText}
                        onClick={handleVerPlanosClick}
                        />

                ))}
            </div>  
            
            <div className="image-container">
                <p></p>
                <img src={Exemplo} alt="" />
            </div>
        </div>
    );
}