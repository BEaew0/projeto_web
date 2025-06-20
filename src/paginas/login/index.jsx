import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../componentes/hook/index";
import { loginUser } from "../../services/login";
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Adicionado - função do AuthContext
    const [showRecovery, setShowRecovery] = useState(false);
    const [formData, setFormData] = useState({ 
        email: "",
        senha: ""
    });
    const [recoveryData, setRecoveryData] = useState({ 
        user_email: "",
        message: "Por favor, redefina minha senha"
    });
    const [emailEnviado, setEmailEnviado] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const [loading, setLoading] = useState(false);
    const formRecovery = useRef();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorLogin("");

        if (showRecovery) {
            if (!validateEmail(recoveryData.user_email)) {
                setErrorLogin("E-mail inválido");
                return;
            }

            try {
                setLoading(true);
                // Implemente aqui a lógica real de recuperação de senha
                console.log("Solicitação de recuperação para:", recoveryData.user_email);
                
                // Simulação de envio
                await new Promise(resolve => setTimeout(resolve, 1500));
                setEmailEnviado(true);
                
            } catch (error) {
                console.error("Erro na recuperação:", error);
                setErrorLogin("Erro ao solicitar recuperação");
            } finally {
                setLoading(false);
            }
        } else {
            // Validação do formulário de login
            if (!formData.email || !formData.senha) {
                setErrorLogin("E-mail e senha são obrigatórios");
                return;
            }

            if (!validateEmail(formData.email)) {
                setErrorLogin("E-mail inválido");
                return;
            }

            try {
                setLoading(true);
                const response = await loginUser({
                    email: formData.email,
                    senha: formData.senha
                });

                if (response.success) {
                    // Modificado - usa a função login do AuthContext
                    login(response.accessToken); // Armazena o token
                    navigate("/home"); // Navega para a página inicial
                } else {
                    setErrorLogin(response.message || "Credenciais inválidas");
                }
            } catch (error) {
                console.error("Erro no login:", error);
                setErrorLogin(error.message || "Erro ao conectar com o servidor");
            } finally {
                setLoading(false);
            }
        }
    };

    // ... (mantenha o restante do código igual)
    const handleChange = (e) => {
        const { name, value } = e.target;
        showRecovery
            ? setRecoveryData(prev => ({ ...prev, [name]: value }))
            : setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errorLogin) setErrorLogin("");
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
                                E-mail de recuperação enviado com sucesso!
                            </p>
                        ) : (
                            <>
                                <ContactUs formData={recoveryData} onChange={handleChange} />
                                {errorLogin && <p className="error_message">{errorLogin}</p>}
                                <span onClick={toggleForm} className="link-style">
                                    Voltar para login
                                </span>
                                <button 
                                    type="submit" 
                                    className="btn_logar"
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : "Recuperar Senha"}
                                </button>
                            </>
                        )}
                    </form>
                ) : (
                    <form className="login_form" onSubmit={handleSubmit}>
                        <LoginForm formData={formData} onChange={handleChange} />
                        
                        {errorLogin && <p className="error_message">{errorLogin}</p>}

                        <span onClick={toggleForm} className="link-style">
                            Esqueci minha senha
                        </span>
                        <button 
                            type="submit" 
                            className="btn_logar"
                            disabled={loading}
                        >
                            {loading ? "Carregando..." : "Login"}
                        </button>
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