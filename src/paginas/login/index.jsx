import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../componentes/autenticação/index";
import LoginForm from "../../componentes/forms/login";
import { ContactUs } from "../../componentes/forms/Recuperação";
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
// import { loginUser } from "../../services/login"; // Import da API real (comentado)
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
      // Lógica de recuperação de senha (mock)
      if (!validateEmail(recoveryData.user_email)) {
        setErrorLogin("Por favor, insira um e-mail válido");
        return;
      }

      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
        setEmailEnviado(true); // Mock sempre retorna sucesso

        /* Implementação com API real (comentada):
        const response = await loginUser(recoveryData.user_email);
        if (response.success) {
          setEmailEnviado(true);
        } else {
          setErrorLogin(response.message || "Erro ao enviar e-mail de recuperação");
        }
        */
      } catch (error) {
        setErrorLogin("Erro ao solicitar recuperação. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }

    } else {
      // Lógica de login (mock ou API)
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

        // ------------------------
        // Opção com Contexto (Mock)
        // ------------------------
        const result = await login(formData.email, formData.senha);

        if (!result.success) {
          setErrorLogin(result.message || "E-mail ou senha incorretos");
        }

        /* ------------------------
        // Opção com API real (comentada)
        const response = await loginUser(formData.email, formData.senha);
        if (response.token && response.user) {
          login(response.token, response.user); // você pode ajustar isso no contexto
          navigate('/home');
        } else {
          setErrorLogin(response.error || "Credenciais inválidas");
        }
        ------------------------ */
        
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
