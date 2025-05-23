import ImgAparelhos from"../../assets/Imagens/img_cel_note.svg"
import "./download.css"

const texto=[
    {
        p:"Organize seu estoque de qualquer lugar!",
     
        funcionalidades:[
                {
                    item:"Controle e gerenciamento produtos"
                },
                {
                    item:"Criação de gráficos"
                },
                {
                    item:"Previsão de estoque"
                },
                {
                    item:"Criação de metas"
                },   
            ]
    }
]

export default function Download(){
return(
   
    <div className="container-pag-download">
            <div className="container-imagem">
                <div className="container-cor"></div>
                <img src={ImgAparelhos}/>
            </div>

            {texto.map((item, key)=>{
                    return (
                         <div className="container-texto-desc" key={key}> 
                                <p>{item.p}</p>
                                <ul>
                                    {item.funcionalidades.map((func,index)=>
                                    (
                                    <li key={index}>● {func.item}</li> 
                                    ))}
                                </ul>
                        </div>
                    )
                }
            )}  
    </div>

    )
};