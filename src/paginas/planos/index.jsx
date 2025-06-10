import Card_planos from "../../componentes/cards/cards-planos"
import "./planos.css"

const planos = [
    {
        titulo: "Plano gratuito",
        valor: 0.00,
        texto: `• Acesso básico aos recursos principais\n• Suporte por email com resposta em até 48h\n• Armazenamento de 1GB\n• Relatórios básicos de desempenho`,
        button: true
    },
    {
        titulo: "Plano Premium",
        valor: 50.00,
        texto: `• Gráficos de análise mais avançados\n• Criação ilimitada de metas\n• Insights de lucro\n• Armazenamento de 10GB\n• Relatórios avançados de desempenho`,
        button: true
    }
];

export default function Planos(){
    return (

        <div className="container_planos">

             <div className="cards-planos">
                {planos.map((plano,key)=>
                    <Card_planos key={key} titulo={plano.titulo} valor={plano.valor} texto={plano.texto} button={plano.button} />
                
                )}

             </div>
        </div>

    )
        
    
};