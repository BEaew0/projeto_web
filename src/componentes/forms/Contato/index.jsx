import Input from "../../input";


const inputs= [
    {
        texto:"Nome",
        name:"user_name",
        type:"text",
        required:true
    },
   {
      texto: "Email",
      name: "user_email",
      type: "email",
      required: true
    },
    {
      texto:"Tipo de problema",
      name:"user_problema",
      type:"select",
      required: true,
      options:['Problemas no app','Produtos não aparecem',]
    }

  ];


  export default function Campos(){

    return(
      <>
        {inputs.map((input,key)=>(
            <Input
                key={key}
                type={input.type}
                texto={input.texto} 
                options={input.options} />
            ))
        }
      </>
    )
  }