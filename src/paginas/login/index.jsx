import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login_form from "../../componentes/forms/login";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Sociais from "../../componentes/footer/icons_";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";


import "./login.css";

const IconsSociais=[
    {
        icon:<FcGoogle/>,
        id:"icon_social"
    },
    {
        icon:<FaLinkedin/>, 
        id:"icon_social"
    }
    
]

export default function Login() {
    const navigate = useNavigate(); // O hook deve ser chamado dentro do componente

    return (
        <div className="container_pg_login">
            <BtnVoltar/>
            
            <div className="main_login">
                <img src={Logo_ts} className="logo"/>

                <form className="login_form">
                    <Login_form/>
                    <Link to="/recuperar-senha" className="link-style">Esqueci minha senha</Link>
                    <button type="submit" className="btn_logar" name="logar">Logar</button>
        
                    <p> 
                        Não possui conta? 
                        <span onClick={() => navigate("/cadastro")} className="link_cadastro">
                            Cadastre-se
                        </span>
                    </p>
        
                     <div className="login_option">
                         {IconsSociais.map((icon,key)=>
                        (<Sociais id={icon.id} icon={icon.icon} key={key}/>))}
                     </div>
                </form>

            </div>

        </div>
    );
}