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

      name: "messagem",
      type: "textarea",
      required: true
    }
  ];


  export default function Contato(){

    return(
        <>
        {inputs.map((Input,key)=>(
            <Input
                key={key}
                type={input.type}
                texto={input.texto}
            />



            ))
        
        
        }
        </>
    )
  }