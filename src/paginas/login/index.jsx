import { useState, useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import { FcGoogle } from "react-icons/fc";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Sociais from "../../componentes/footer/icons_";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import { loginUser } from "../../services/login.js";
import "./login.css";

const socialIcons = [
    {
        icon: <FcGoogle />,
        id: "icon_social"
    }
]

export default function LoginPage() 
{
    const navigate = useNavigate();
    const [showRecovery, setShowRecovery] = useState(false);

    // Mantém name no estado para o input, mas não envia no login
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        senha: ""
    });

    const [recoveryData, setRecoveryData] = useState({
        user_email: "",
        message: ""
    });

    const [emailEnviado, setEmailEnviado] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const formRecovery = useRef();

    useEffect(() => {
        emailjs.init('service_nbv9ufd')
    }, []);

    const validateEmail = (email) => 
    {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showRecovery) {
            try {
                const result = await emailjs.sendForm(
                   'service_nbv9ufd',
                    'template_xrd3aep', 
                    formRecovery.current,
                    'TGGUjJjDOARZYz2ri'
                );
                
                console.log("E-mail enviado com sucesso:", result);
                setEmailEnviado(true);
                
                setTimeout(() => 
                {
                    setShowRecovery(false);
                    setEmailEnviado(false);
                    setRecoveryData({ user_email: "", message: "" });
                }, 3000);
                
            } catch (error) {
                console.error("Detalhes do erro:", 
                {
                    status: error.status,
                    text: error.text,
                    message: error.message
                });
                alert(`Erro ao enviar e-mail: ${error.text || "Tente novamente mais tarde"}`);
            }
        } else {
            setErrorLogin("");

            if (!validateEmail(formData.email)) 
            {
                setErrorLogin("E-mail inválido");
                return;
            }

            // ** Alteração importante: enviar somente email e senha para login **
            const response = await loginUser({
                email: formData.email,
                senha: formData.senha
            });

            if (response.success) 
            {
                setErrorLogin("");
                navigate("/home");
            } 
            else 
            {
                setErrorLogin(response.message || "Erro ao tentar logar");
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
                                    <ContactUs formData={recoveryData} onChange={handleChange} />

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
                        <LoginForm formData={formData} onChange={handleChange} />

                        {errorLogin && <p className="error_message">{errorLogin}</p>}

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
