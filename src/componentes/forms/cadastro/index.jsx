import Input from "../../input";
import React from "react";

const inputs_cad = [
    {
        texto: "Nome",
        name: "nome_usuario",
        id: "nome_cad",
        type: "text",
        required: true,
        autoComplete: "name"  // Adicionado
    },
    {
        texto: "CPF",
        name: "CPF_usuario",
        id: "cpf_cad",
        type: "text",
        required: true,
        autoComplete: "off"  // Desativado para campos sensíveis
    },
    {
        texto: "CNPJ",
        name: "CNPJ_usuario",
        id: "cnpj_cad",
        type: "text",
        required: false,
        autoComplete: "off"
    },
    {
        texto: "Data de Nascimento",
        name: "dta_nascimento",
        id: "data_nascimento",
        type: "date",
        required: true,
        autoComplete: "bday"  // Padrão para datas de nascimento
    },
    {
        texto: "Email",
        name: "email_usuario",
        id: "email_cad",
        type: "email",
        required: true,
        autoComplete: "email"  // Padrão para emails
    },
    {
        texto: "Confirmar E-mail",
        name: "conf_email",
        id: "email_conf",
        type: "email",
        required: true,
        autoComplete: "email"  // Também para confirmação
    },
    {
        texto: "Senha",
        name: "senha_cad",
        id: "senha",
        type: "password",
        required: true,
        autoComplete: "new-password",  // Importante para senhas
        minLength: 6  // Adicionado validação mínima
    },
    {
        texto: "Confirmar senha",
        name: "senha_conf",
        id: "senhacof",
        type: "password",
        required: true,
        autoComplete: "new-password"  // Também para confirmação
    }
];

export default function CadForm({ formData, onInputChange, errors }) {
    return (
        <>
            {inputs_cad.map((input) => (
                <Input
                    key={input.id}
                    type={input.type}
                    texto={input.texto}
                    name={input.name}
                    id={input.id}
                    options={input.options}
                    required={input.required}
                    value={formData[input.name] || ""}
                    onChange={onInputChange}
                    error={errors[input.name]}
                    autoComplete={input.autoComplete}
                    {...(input.minLength && { minLength: input.minLength })}/>
            ))}
        </>
    );
}