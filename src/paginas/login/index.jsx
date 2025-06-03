import { useState } from "react";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (showRecovery) 
        {
            try {
                await emailjs.sendForm
                (
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    formRecovery.current,
                    'YOUR_PUBLIC_KEY'
                );
                
                setEmailEnviado(true);
                setTimeout(() => {
                    setShowRecovery(false);
                    setEmailEnviado(false);
                }, 3000);
            } 
            catch (error) 
            {
                console.error("Falha ao enviar e-mail:", error);
                alert("Erro ao enviar e-mail de recuperação. Tente novamente.");
            }
        } 
        else 
        {
            console.log("Login enviado:", formData);
            // Lógica de autenticação aqui
        }
    };

    const handleChange = (e) => 
    {
        const { name, value } = e.target;
        setFormData(prev => (
            {...prev,[name]: value}));
    };

    const toggleForm = () => {
        setShowRecovery(!showRecovery);
        setFormData({ 
            email: "", 
            password: "", 
          
            user_email: "",
            message: ""});
        setEmailEnviado(false);
    };

    return (
        <div className="container_pg_login">
            <BtnVoltar />
            
            <div className="main_login">
                <img src={Logo_ts} alt="Logo" className="logo" />

                {showRecovery ? (
                    <form ref={formRecovery} onSubmit={handleSubmit} className="login_form">
                        {
                        emailEnviado ? 
                        (
                            <p className="mensagem-sucesso">E-mail de recuperação enviado com sucesso!</p>
                        ) : 
                        (
                            <>
                                <ContactUs  formData={formData} onChange={handleChange}/>
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
                        
                        <LoginForm formData={formData}onChange={handleChange}/>
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