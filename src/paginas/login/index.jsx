import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login_form from "../../componentes/forms/login";
import RecForm from "../../componentes/forms/Recuperação/inde";

import { FcGoogle } from "react-icons/fc";

import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Sociais from "../../componentes/footer/icons_";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";

import "./login.css";

const IconsSociais = [
    {
        icon: <FcGoogle />,
        id: "icon_social"
    }
]

export default function Login() {
    const navigate = useNavigate(); 
    const [form, setForm] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(form ? "Recuperação enviada" : "Login enviado");
    }




      useEffect(())
    function mostrarForm() {
        setForm(!form);
    }

    return (
        <div className="container_pg_login">
            <BtnVoltar/>
            
            <div className="main_login">
                <img src={Logo_ts} className="logo"/>

                <form className="login_form" onSubmit={handleSubmit}>
                    {form ? 
                      (
                        <>
                            <RecForm />
                            <span onClick={mostrarForm} className="link-style">
                                Voltar para login
                            </span>
                            <button type="submit" className="btn_logar" name="recuperar">
                                Recuperar Senha
                            </button>
                        </> 
                      ):
                      (
                        <>
                            <Login_form />
                            <span onClick={mostrarForm} className="link-style">
                                Esqueci minha senha
                            </span>
                            <button type="submit" className="btn_logar" name="logar">
                                Logar
                            </button>
            
                            <p> 
                                Não possui conta? 
                                <span onClick={() => navigate("/cadastro")} className="link_cadastro">
                                    Cadastre-se
                                </span>
                            </p>
            
                            <div className="login_option">
                                {IconsSociais.map((icon, key) =>
                                    (<Sociais id={icon.id} icon={icon.icon} key={key}/>))
                                }
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}