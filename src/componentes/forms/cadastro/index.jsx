import Input from "../../input";
import React from "react";

const inputs_cad = [
    {
        texto: "Nome",
        name: "nome_usuario",
        id: "nome_cad",
        type: "text",
        required: true
    },
    {
        texto: "CPF",
        name: "CPF_usuario",
        id: "cpf_cad",
        type: "text",
        required: true
    },
    {
        texto: "CNPJ",
        name: "CNPJ_usuario",
        id: "cnpj_cad",
        type: "text",
        required: false
    },
    {
        texto: "Data de Nascimento",
        name: "dta_nascimento",
        id: "data_nascimento",
        type: "date",
        required: true
    },
    {
        texto: "Email",
        name: "email_usuario",
        id: "email_cad",
        type: "email",
        required: true
    },
    {
        texto: "Confirmar E-mail",
        name: "conf_email",
        id: "email_conf",
        type: "email",
        required: true
    },
    {
        texto: "Senha",
        name: "senha_cad",
        id: "senha",
        type: "password",
        required: true
    },
    {
        texto: "Confirmar senha",
        name: "senha_conf",
        id: "senhacof",
        type: "password",
        required: true
    },
    {
        texto: "Plano",
        name: "plano_user",
        id: "plano",
        type: "select",  // Alterado de "text" para "select"
        required: true,
        options: ["Grátis", "Pago"]  // Opções para o select
    }
];

export default function CadForm({ formData, onInputChange, errors }) {
    return (
        <>
            {inputs_cad.map((input) => (
                <Input
                    key={input.id}  // Melhor usar id como chave
                    type={input.type}
                    texto={input.texto}
                    name={input.name}
                    id={input.id}
                    options={input.options}  // Sempre passar options quando existir
                    required={input.required}
                    value={formData[input.name] || ""}
                    onChange={onInputChange}
                    error={errors[input.name]}/>
            ))}
        </>
    );
}