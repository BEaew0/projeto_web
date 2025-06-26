import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../componentes/autenticação/index";
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

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
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRecovery = useRef();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (showRecovery) {
      handleRecoverySubmit();
    } else {
      handleLoginSubmit();
    }
  };

  const handleLoginSubmit = async () => {
    if (!formData.email || !formData.senha) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    try {
      setSubmitting(true);
      const result = await login(formData.email, formData.senha);

      if (!result.success) {
        setError(result.message || "Credenciais inválidas");
        return;
      }

      navigate("/home");
    } catch (err) {
      setError("Ocorreu um erro durante o login");
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecoverySubmit = async () => {
    if (!validateEmail(recoveryData.user_email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    try {
      setSubmitting(true);
      // Substitua por chamada real à API de recuperação
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailEnviado(true);
    } catch (err) {
      setError("Erro ao solicitar recuperação");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const setData = showRecovery ? setRecoveryData : setFormData;
    setData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const toggleForm = () => {
    setShowRecovery(!showRecovery);
    setEmailEnviado(false);
    setError("");
  };

  if (isLoading) {
    return (
      <div className="container_pg_login">
        <div className="loading-spinner">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

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
                <button 
                  type="button" 
                  className="btn_logar" 
                  onClick={toggleForm}
                >
                  Voltar para login
                </button>
              </div>
            ) : (
              <>
                <ContactUs formData={recoveryData} onChange={handleChange} />
                {error && <p className="error_message">{error}</p>}
                <span onClick={toggleForm} className="link-style">
                  Voltar para login
                </span>
                <button 
                  type="submit" 
                  className="btn_logar" 
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Enviando..." : "Recuperar Senha"}
                </button>
              </>
            )}
          </form>
        ) : (
          <form className="login_form" onSubmit={handleSubmit}>
            <LoginForm formData={formData} onChange={handleChange} />
            {error && <p className="error_message">{error}</p>}

            <span onClick={toggleForm} className="link-style">
              Esqueci minha senha
            </span>
            <button 
              type="submit" 
              className="btn_logar" 
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Entrando..." : "Login"}
            </button>

            <p className="register-link">
              Não possui conta?{" "}
              <span 
                onClick={() => navigate("/cadastro")} 
                className="link_cadastro" 
                role="button" 
                tabIndex="0"
              >
                Cadastre-se
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}