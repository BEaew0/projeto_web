import Card_planos from "../../componentes/cards/cards-planos"

const planos=[
    {
        titulo:"Plano gratuito",
        valor:0.00,
        texto: [
            "Acesso básico aos recursos principais",
            "Limite de rojetos ativos",
            "Suporte por email com resposta em até 48h",
            "Armazenamento de 1GB",
            "Relatórios básicos de desempenho"
        ],
        button:true
    },{
        titulo:"Plano gratuito",
        valor:0.00,
        texto: [
            "Acesso básico aos recursos principais",
            "Limite de rojetos ativos",
            "Suporte por email com resposta em até 48h",
            "Armazenamento de 1GB",
            "Relatórios básicos de desempenho"
        ],
        button:true
    }
]

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