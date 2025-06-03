import { useRef } from 'react';
import Input from "../../input";
import emailjs from '@emailjs/browser';

const Inputs = [
    {
        texto: "Email",
        name: "email_rec", 
        id: "email",
        type: "email",
        required: true,
    },
    {
        texto: "MSG",
        name: "msg_rec", // Nome do campo (deve bater com o template do EmailJS)
        id: "msg",
        type: "text", // Alterado de "mensagem" para "text" (tipos HTML válidos)
        required: true,
    },
];

export default function RecForm({ email, onChange }) {
    const form = useRef(); // Referência para o formulário

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'YOUR_SERVICE_ID', // Substitua pelo seu Service ID
                'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID
                form.current, // Referência do formulário
                'YOUR_PUBLIC_KEY' // Substitua pela sua Public Key
            )
            .then(
                () => {
                    console.log('E-mail enviado com sucesso!');
                    alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
                },
                (error) => {
                    console.error('Falha no envio:', error);
                    alert('Erro ao enviar o e-mail. Tente novamente.');
                }
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            {Inputs.map((input, key) => (
                <Input
                    key={key}
                    type={input.type}
                    texto={input.texto}
                    id={input.id}
                    value={email}
                    name={input.name}
                    onChange={onChange}
                    required={input.required}/>
            ))}
            <button type="submit">Enviar</button>
        </form>
    );
}