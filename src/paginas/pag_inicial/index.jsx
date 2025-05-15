
import Card from "../../componentes/cards/card-inicial";
import"./pag.css"



const cards=[{
    cinza:false,
    titulo:"Controle seu estoque sem complicação!",
     texto: "O TesouroAzul simplifica o controle do seu estoque.\n" +
           "Evita perdas\n"+
           "e desorganização.\n" +
           "Com ferramentas intuitivas\n"+
            "você gerencia produtos.\n" +
           "Mantém seu negócio sempre no azul – sem dor de cabeça!"
}]

export default  function Pag_inicial(){
    return(
        <div className="main_pag_inicial">
            {cards.map((card,key)=>
                {
                    return(
                    <Card key={key}cinza={card.cinza} titulo={card.titulo}texto={card.texto}/>
                    );
                }     
            )}  
                
            <div className="card-img-exemplo">
            
            </div>



        </div>


        
        
    )
}


            