import Input from "../../input";

const mudarInfo = {
  "email": [ // Alterado de "Mudar-email" para "email" para consistência
    {
      texto: "Novo Email",
      name: "novoEmail",
      id: "novo-email",
      type: "email",
      required: true,
      placeholder: "Digite seu novo email"
    },
    {
      texto: "Confirmar Email",
      name: "confirmarEmail",
      id: "confirmar-email",
      type: "email",
      required: true,
      placeholder: "Confirme o novo email"
    }
  ],
  "senha": [ // Alterado de "Mudar-Senha" para "senha" para consistência
    {
      texto: "Senha Antiga",
      name: "senha_antiga",
      id: "email-recuperacao",
      type: "text",
      required: true,
      placeholder: "Digite sua senha",
      disabled: true
    },
    {
      texto: "Senha nova",
      name: "senha_nova",
      id: "senha-nova",
      type: "text",
      required: true,
      placeholder: "Digite sua senha",
      disabled: true

    }
  ]
};

export default function MudarInfo({ tipo, values, onChange,enviado }) {
  // Determina qual formulário mostrar baseado no prop 'tipo'
  const formularioAtivo = mudarInfo[tipo] || [];
  
  return (
    <form className={`form-${tipo}`}>
      {formularioAtivo.map((input, index) => (

          <Input
            key={index}
            type={input.type}
            texto={input.texto}
            name={input.name}
            id={input.id}
            required={input.required}
            placeholder={input.placeholder}
            value={values[input.name] || ''}
            onChange={onChange}
            disabled={input.disabled}/>
      ))}

     <button className="btn_enviar">Enviar</button>
    </form>
  );
}