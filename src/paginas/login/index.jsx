import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login_form from "../../componentes/forms/login";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

export default function Login() {
    const navigate = useNavigate(); // O hook deve ser chamado dentro do componente

    return (
        <div className="main_log">
            <form className="log_form">
                <Login_form/>
                <Link to="/recuperar-senha" className="link-style">Esqueci minha senha</Link>
                <button type="submit" className="btn_logar" name="logar">Logar</button>
                
                <p> Não possui conta? 
                    <span onClick={() => navigate("/cadastro")}  className="link_cadastro">
                         Cadastre-se
                    </span>
                </p>
                
                <div className="google-login" onClick={() => {/* Lógica do Google */}}>
                    <FcGoogle className="google-icon"/>
                   
                </div>
            </form>
        </div>
    );
}