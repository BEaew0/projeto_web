import Input from "../../input";

const LogInputs = [
    {
        texto: "Nome",
        name: "name",   // alterei para "name" para combinar com LoginPage
        id: "nome_log",
        type: "text",
        required: true,
    },
    {
        texto: "E-mail",
        name: "email",  // aqui troca CPF/CNPJ por email
        id: "email_log",
        type: "email",
        required: true
    },
    {
        texto: "Senha",
        name: "senha",
        id: "senha",
        type: "password",
        required: true
    }
];

export default function LoginForm({ formData, onChange }) {
    return (
        <>
            {LogInputs.map((input, key) => (
                <Input
                    key={key}
                    type={input.type}
                    texto={input.texto}
                    name={input.name}
                    id={input.id}
                    value={formData[input.name] || ""}
                    onChange={onChange}
                    required={input.required}
                />
            ))}
        </>
    );
}
