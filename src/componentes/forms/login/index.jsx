import Input from "../../input";

const LogInputs=[
    {
        texto:"Nome",
        name: "nome_login",
        id:"nome_log",
        type:"text",
        required: true,

    },
    {
        texto:"CPF/CNPJ",
        name:"log_pessoa",
        id:"pessoafj",
        type:"text",
        required: true
    },
    {
        texto:"Senha",
        name:"senha_log",
        id:"senha",
        type:"password",
        required: true

    }

];



export default function LogForm(){
    return (
        <>
            {LogInputs.map((input, key) => (
                <Input 
                    key={key}
                    type={input.type}
                    texto={input.texto}
                    name={input.name}
                    id={input.id}
                    required={input.required}
                 />
            ))}
        </>
        
    );
    
}
    
