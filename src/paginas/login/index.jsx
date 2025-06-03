import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../componentes/forms/login";
import RecForm from "../../componentes/forms/Recuperação";
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
        password: ""
    });

    // Efeito para focar no campo correto quando alternar
    useEffect(() => {
        const inputName = showRecovery ? "recoverEmail" : "email";
        const inputElement = document.querySelector(`input[name="${inputName}"]`);
        if (inputElement) inputElement.focus();
    }, [showRecovery]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(showRecovery ? "Recuperação enviada" : "Login enviado", formData);
        // Aqui você adicionaria a lógica de autenticação/recuperação
    }

    function toggleForm() {
        setShowRecovery(!showRecovery);
        setFormData({ email: "", password: "" }); // Limpa os dados ao alternar
    }

    return (
        <div className="container_pg_login">
            <BtnVoltar />
            
            <div className="main_login">
                <img src={Logo_ts} alt="Logo" className="logo" />

                <form className="login_form" onSubmit={handleSubmit}>
                    {showRecovery ? (
                        <>
                            <RecForm
                                email={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                            <span onClick={toggleForm} className="link-style">
                                Voltar para login
                            </span>
                            <button type="submit" className="btn_logar">
                                Recuperar Senha
                            </button>
                        </>
                    ) : (
                        <>
                            <LoginForm formData={formData}onChange={(e) => setFormData({ ...formData,  [e.target.name]: e.target.value})}/>
                            
                            <span onClick={toggleForm} className="link-style">
                                Esqueci minha senha
                            </span>

                            <button type="submit" className="btn_logar"> Logar</button>
            
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
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}