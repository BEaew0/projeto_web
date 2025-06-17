import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import emailjs from '@emailjs/browser'; // Descomente para usar o serviço de email
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
// import { loginUser } from "../../services/login.js"; // Descomente para usar a API real
import "./login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showRecovery, setShowRecovery] = useState(false);
    const [formData, setFormData] = useState({ 
        name: "Usuário Teste", // Mock
        email: "teste@example.com", // Mock
        senha: "123456" // Mock
    });
    const [recoveryData, setRecoveryData] = useState({ 
        user_email: "teste@example.com", // Mock
        message: "Por favor, redefina minha senha" // Mock
    });
    const [emailEnviado, setEmailEnviado] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const formRecovery = useRef();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showRecovery) {
            try {
                /* Descomente para usar o serviço real de email
                await emailjs.sendForm(
                    'seu_service_id',
                    'seu_template_id',
                    formRecovery.current,
                    'seu_user_id'
                );
                */
                console.log("Dados que seriam enviados por email:", recoveryData.user_email);
                setEmailEnviado(true);
                setTimeout(() => {
                    setShowRecovery(false);
                    setEmailEnviado(false);
                }, 3000);
            } catch (error) {
                console.error("Erro no email:", error);
                alert("Erro ao enviar e-mail");
            }
        } else {
            setErrorLogin("");
            if (!validateEmail(formData.email)) {
                setErrorLogin("E-mail inválido");
                return;
            }

            try {
                /* Descomente para usar a API real
                const response = await loginUser(formData);
                if (response.success) {
                    navigate("/home");
                } else {
                    setErrorLogin(response.message);
                }
                */
                console.log("Tentativa de login com:", formData);
                navigate("/home", { 
                    state: { 
                        message: "Modo de demonstração - usando dados mockados",
                        isMock: true 
                    } 
                });
            } catch (error) {
                setErrorLogin("Erro no servidor");
                console.error("Erro no login:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        showRecovery
            ? setRecoveryData(prev => ({ ...prev, [name]: value }))
            : setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleForm = () => {
        setShowRecovery(!showRecovery);
        setEmailEnviado(false);
        setErrorLogin("");
    };

    return (
        <div className="container_pg_login">
            <div className="btn-voltar-container">
                <BtnVoltar onClick={() => navigate(-1)} />
            </div>

            <div className="main_login">
                <img src={Logo_ts} alt="Logo" className="logo" />

                {showRecovery ? (
                    <form ref={formRecovery} onSubmit={handleSubmit} className="login_form">
                        {emailEnviado ? (
                            <p className="mensagem-sucesso">
                                Simulação: E-mail de recuperação enviado! (ver console)
                            </p>
                        ) : 
                        (
                            <>
                                <ContactUs formData={recoveryData} onChange={handleChange} />
                                <span onClick={toggleForm} className="link-style">
                                    Voltar para login
                                </span>
                                <button type="submit" className="btn_logar">
                                    Simular Recuperação
                                </button>
                            </>
                        )}
                    </form>
                ) : 
                (
                    <form className="login_form" onSubmit={handleSubmit}>
                        <LoginForm formData={formData} onChange={handleChange} />
                        
                        {errorLogin && <p className="error_message">{errorLogin}</p>}

                        <span onClick={toggleForm} className="link-style">
                            Esqueci minha senha
                        </span>
                        <button type="submit" className="btn_logar">Login</button>
                        <p>
                            Não possui conta?{" "}
                            <span onClick={() => navigate("/cadastro")} className="link_cadastro">
                                Cadastre-se
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}