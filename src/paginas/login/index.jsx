import { useState, useEffect } from "react"; // Adicionamos useEffect
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import LoginForm from "../../componentes/forms/login";
import React, { useRef } from 'react';
import {ContactUs} from "../../componentes/forms/Recuperação";
import { FcGoogle } from "react-icons/fc";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Sociais from "../../componentes/footer/icons_";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./login.css";

const socialIcons = [
    {
        icon: <FcGoogle />,
        id: "icon_social"
    }
]

export default function LoginPage() {
    const navigate = useNavigate();
    const [showRecovery, setShowRecovery] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        user_email: "",
        message: ""
    });
    const [emailEnviado, setEmailEnviado] = useState(false);
    const formRecovery = useRef();

    // Inicialização do EmailJS
    useEffect(() => {
        emailjs.init('service_nbv9ufd')
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (showRecovery) {
            try {
                // Adicionamos await e tratamento correto da Promise
                const result = await emailjs.sendForm(
                   'service_nbv9ufd',
                    'template_xrd3aep', 
                    formRecovery.current,
                    'TGGUjJjDOARZYz2ri'
                );
                
                console.log("E-mail enviado com sucesso:", result);
                setEmailEnviado(true);
                
                // Reset após 3 segundos
                setTimeout(() => {
                    setShowRecovery(false);
                    setEmailEnviado(false);
                }, 3000);
                
            } catch (error) {
                console.error("Detalhes do erro:", {
                    status: error.status,
                    text: error.text,
                    message: error.message
                });
                alert(`Erro ao enviar e-mail: ${error.text || "Tente novamente mais tarde"}`);
            }
        } else {
            console.log("Login enviado:", formData);
            // Lógica de autenticação aqui
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const toggleForm = () => {
        setShowRecovery(!showRecovery);
        setFormData({ 
            email: "", 
            password: "", 
            user_email: "",
            message: ""
        });
        setEmailEnviado(false);
    };

    return (
        <div className="container_pg_login">
            <BtnVoltar />
            
            <div className="main_login">
                <img src={Logo_ts} alt="Logo" className="logo" />

                {showRecovery ? (
                    <form ref={formRecovery} onSubmit={handleSubmit} className="login_form">
                        {emailEnviado ? 
                            (
                                <p className="mensagem-sucesso">E-mail de recuperação enviado com sucesso!</p>
                            ) : 
                            (
                                <>
                                    <ContactUs formData={formData} onChange={handleChange}/>

                                    <span onClick={toggleForm} className="link-style">
                                        Voltar para login
                                    </span>

                                    <button type="submit" className="btn_logar">
                                         Recuperar Senha
                                    </button>
                                </>
                        )}
                    </form>
                ) : (

                    <form className="login_form" onSubmit={handleSubmit}>
                        <LoginForm formData={formData} onChange={handleChange}/>
                        
                        <span onClick={toggleForm} className="link-style">
                            Esqueci minha senha
                        </span>
                        
                        <button type="submit" className="btn_logar">Logar</button>
        
                        <p> 
                            Não possui conta? 
                            <span onClick={() => navigate("/cadastro")} className="link_cadastro">
                                Cadastre-se
                            </span>
                        </p>
        
                        <div className="login_option">
                            {socialIcons.map((icon, index) => (
                                <Sociais id={icon.id} icon={icon.icon} key={index} />
                            ))}
                        </div>

                    </form>

                )}
            </div>
        </div>
    );
}