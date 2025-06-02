import Input from "../../input";

const Inputs=[
    {
        texto:"Email",
        name: "email_rec",
        id:"email",
        type:"email",
        required: true,

    },
   
    

];



export default function RecForm(){
    return (
        <>
            {Inputs.map((input,key)=>
            (<Input 
                key={key} 
                type={input.type} 
                texto={input.texto} 
                id={input.id}
                name={input.name}
                required={input.required}
                />)
            )}
        </>
        
    );
    
}
    
