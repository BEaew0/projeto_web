import { useState, useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
// import emailjs from '@emailjs/browser'; // Comentado para testes
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import { FcGoogle } from "react-icons/fc";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Sociais from "../../componentes/footer/icons_";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
// import { loginUser } from "../../services/login.js"; // Comentado para testes
import "./login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showRecovery, setShowRecovery] = useState(false);

    // Dados mockados para o formulário de login
    const [formData, setFormData] = useState({
        name: "Usuário Teste", // Mock
        email: "teste@example.com", // Mock
        senha: "123456" // Mock
    });

    // Dados mockados para recuperação
    const [recoveryData, setRecoveryData] = useState({
        user_email: "teste@example.com", // Mock
        message: "Por favor, redefina minha senha" // Mock
    });

    const [emailEnviado, setEmailEnviado] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const formRecovery = useRef();

    // useEffect(() => {
    //     emailjs.init('service_nbv9ufd') // Comentado para testes
    // }, []);

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showRecovery) {
            try {
                // Mock do envio de email - substitui a chamada real
                console.log("Dados que seriam enviados por email:", recoveryData);
                
                // Simulação de envio bem-sucedido
                setEmailEnviado(true);
                
                setTimeout(() => {
                    setShowRecovery(false);
                    setEmailEnviado(false);
                    setRecoveryData({ user_email: "", message: "" });
                }, 3000);
                
            } catch (error) {
                console.error("Erro simulado no envio de email:", error);
                alert("Erro simulado ao enviar e-mail. Verifique o console.");
            }
        } else {
            setErrorLogin("");

            if (!validateEmail(formData.email)) {
                setErrorLogin("E-mail inválido");
                return;
            }

            // Mock do login - substitui a chamada à API
            console.log("Dados de login que seriam enviados:", {
                email: formData.email,
                senha: formData.senha
            });

            // Simulação de resposta da API
            const mockResponse = {
                success: true,
                message: "Login mockado com sucesso!"
            };

            if (mockResponse.success) {
                setErrorLogin("");
                navigate("/home", { 
                    state: { 
                        message: "Você está em modo de teste (dados mockados)",
                        isMock: true 
                    } 
                });
            } else {
                setErrorLogin(mockResponse.message || "Erro simulado ao tentar logar");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (showRecovery) {
            setRecoveryData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const toggleForm = () => {
        setShowRecovery(!showRecovery);
        setFormData({ name: "", email: "", senha: "" });
        setRecoveryData({ user_email: "", message: "" });
        setEmailEnviado(false);
        setErrorLogin("");
    };

    return (
        <div className="container_pg_login">
            <BtnVoltar onClick={() => navigate(-1)} />
            
            <div className="main_login">
                <img src={Logo_ts} alt="Logo" className="logo" />

                {showRecovery ? (
                    <form ref={formRecovery} onSubmit={handleSubmit} className="login_form">
                        {emailEnviado ? 
                            (
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
                            )
                        }
                    </form>
                ) : 
                (
                    <form className="login_form" onSubmit={handleSubmit}>
                        <LoginForm formData={formData} onChange={handleChange} />

                        {errorLogin && <p className="error_message">{errorLogin}</p>}

                        <span onClick={toggleForm} className="link-style">
                            Esqueci minha senha
                        </span>
                        
                        <button type="submit" className="btn_logar">
                           Login
                        </button>
        
                        <p> 
                            Não possui conta? 
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