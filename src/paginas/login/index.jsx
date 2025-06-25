import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../componentes/autenticação/index";
import { loginUser } from "../../services/login";
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  // Validação de e-mail
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin("");

    if (showRecovery) {
      // Lógica de recuperação de senha
      if (!validateEmail(recoveryData.user_email)) {
        setErrorLogin("Por favor, insira um e-mail válido");
        return;
      }

      try {
        setLoading(true);
        // TODO: Implementar chamada real à API de recuperação de senha
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEmailEnviado(true);
      } catch (error) {
        setErrorLogin("Erro ao solicitar recuperação. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    } else {
      // Lógica de login usando o serviço loginUser
      if (!formData.email || !formData.senha) {
        setErrorLogin("Todos os campos são obrigatórios");
        return;
      }

      if (!validateEmail(formData.email)) {
        setErrorLogin("Por favor, insira um e-mail válido");
        return;
      }

      try {
        setLoading(true);
        
        // Chamada ao serviço loginUser
        const result = await loginUser({
          email: formData.email,
          senha: formData.senha
        });

        if (result.success) {
          // Usa o método login do AuthContext para atualizar o estado global
          login(result.user);
          navigate('/home');
        } else {
          setErrorLogin(result.message || "E-mail ou senha incorretos");
        }
      } catch (error) {
        setErrorLogin("Ocorreu um erro durante o login. Tente novamente.");
      } finally {
        setLoading(false);
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
              <div className="recovery-success">
                <p className="mensagem-sucesso">
                  E-mail de recuperação enviado com sucesso!
                </p>
                <button type="button" className="btn_logar" onClick={toggleForm}>
                  Voltar para login
                </button>
              </div>
            ) : (
              <>
                <ContactUs formData={recoveryData} onChange={handleChange} />
                {errorLogin && <p className="error_message">{errorLogin}</p>}
                <span onClick={toggleForm} className="link-style">
                  Voltar para login
                </span>
                <button type="submit" className="btn_logar" disabled={loading} aria-busy={loading}>
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
            <button type="submit" className="btn_logar" disabled={loading} aria-busy={loading}>
              {loading ? "Carregando..." : "Login"}
            </button>

            <p className="register-link">
              Não possui conta?{" "}
              <span onClick={() => navigate("/cadastro")} className="link_cadastro" role="button" tabIndex="0">
                Cadastre-se
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}