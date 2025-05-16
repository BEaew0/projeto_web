import Input from "../../input";


const inputs_cad=[
    {
        texto:"Nome",
        name:"nome_usuario",
        id:"nome_cad",
        type:"texto",
        required:true
    },
    {
        texto:"CPF",
        name:"CPF_usuario",
        id:"CPF",
        type:"texto",
        required:true
    },
    {
        texto:"CNPJ",
        name:"CNPJ_usuario",
        id:"CNPJ",
        type:"texto",
        required:false
    },
    {
        texto:"Data de Nascimento",
        name:"dta_nascimento",
        id:"data",
        type:"date",
        required:true
    },
    {
        texto:"Email",
        name:"email_usuario",
        id:"email_cad",
        type:"email",
        required:true
    },
    {
        texto:"Confirmar E-mail",
        name:"conf_email",
        id:"email_conf",
        type:"email",
        required:true
    },
    {
        texto:"Senha",
        name:"senha_cad",
        id:"senha",
        type:"password",
        required:true
    },
    {
        texto:"Confirmar senha",
        name:"senha_conf",
        id:"senhacof",
        type:"password",
        required:true
    }
]
export default function CadForm(){
    return(
        <>
        {inputs_cad.map((input,key)=>(
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
        
    )
}