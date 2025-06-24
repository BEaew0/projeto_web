import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUser } from "../../services/cadastro.js";
import CadForm from "../../componentes/forms/cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Card_planos from "../../componentes/cards/cards-planos/index.jsx";
import Logo_ts from "../../assets/Imagens/logo_tcc1.png";
import Mensagem from "../../componentes/modals/Mensagem/index.jsx";
import "./cadastro.css";

// Validation functions
const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  
  return true;
};

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nome_usuario: "",
    CPF_usuario: "",
    CNPJ_usuario: "",
    dta_nascimento: "",
    email_usuario: "",
    conf_email: "",
    senha_cad: "",
    senha_conf: "",
  });

  const [erros, setErrors] = useState({});
  const [etapa, setEtapa] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const inputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'CPF_usuario') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    } else if (name === 'CNPJ_usuario') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }));
    
    if (erros[name]) {
      setErrors(prev => {
        const newErros = { ...prev };
        delete newErros[name];
        return newErros;
      });
    }
  };

  const validarForm = () => {
    const Erros = {};
    
    if (!form.nome_usuario.trim()) Erros.nome_usuario = "Nome é obrigatório";
    if (!form.email_usuario.trim()) Erros.email_usuario = "Email é obrigatório";
    if (!form.senha_cad) Erros.senha_cad = "Senha é obrigatória";
    if (form.senha_cad.length < 6) Erros.senha_cad = "Senha deve ter pelo menos 6 caracteres";
    if (form.email_usuario !== form.conf_email) Erros.conf_email = "Emails não coincidem";
    if (form.senha_cad !== form.senha_conf) Erros.senha_conf = "Senhas não coincidem";
    
    if (!form.CPF_usuario && !form.CNPJ_usuario) {
      Erros.CPF_usuario = "CPF ou CNPJ é obrigatório";
    } else {
      if (form.CPF_usuario && !validarCPF(form.CPF_usuario)) {
        Erros.CPF_usuario = "CPF inválido";
      }
      if (form.CNPJ_usuario && !validarCNPJ(form.CNPJ_usuario)) {
        Erros.CNPJ_usuario = "CNPJ inválido";
      }
    }

    setErrors(Erros);
    return Object.keys(Erros).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validarForm()) {
      setEtapa(2);
    }
  };

  const handleCadastroReal = async () => {
    setLoading(true);
    setApiError(null);
    
    try {
      const userData = {
        NOME_USUARIO: form.nome_usuario,
        CPF_USUARIO: form.CPF_usuario,
        CNPJ_USUARIO: form.CNPJ_usuario || undefined,
        EMAIL_USUARIO: form.email_usuario,
        SENHA_USUARIO: form.senha_cad,
        DATA_NASC_USUARIO: form.dta_nascimento || undefined,
        ID_ASSINATURA_FK: selectedPlano?.planoId || 1
      };

      const resultado = await cadastrarUser(userData);
      
      if (resultado.success) {
        navigate(resultado.warning ? "/home?warning=true" : "/home", { 
          state: { 
            mensagem: resultado.message,
            cadastroSucesso: true,
            warning: resultado.warning
          }
        });
      } else {
        setApiError(resultado.message || "Erro ao cadastrar");
      }
    } catch (error) {
      setApiError("Erro inesperado no sistema. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionarPlano = (planoId, isPremium) => {
    if (!planoId) {
      setApiError("Por favor, selecione um plano antes de continuar");
      return;
    }
    setSelectedPlano({ planoId, isPremium });
    setShowModal(true);
  };

  const handleModalClick = (acao) => {
    setShowModal(false);
    if (acao === "Confirmar") {
      handleCadastroReal();
    }
  };

  return (
    <div className="main_cadastro">
      <div className="mini-header">
        <BtnVoltar onClick={() => etapa === 1 ? navigate(-1) : setEtapa(1)} />
      </div>

      <div className="container_cadastro">
        <img src={Logo_ts} alt="Logo" />

        {etapa === 1 ? (
          <form className="form_cadastro" onSubmit={handleFormSubmit}>
            <CadForm 
              formData={form} 
              onInputChange={inputChange} 
              errors={erros} 
            />

            {apiError && <div className="error-message">{apiError}</div>}

            <button className="btn_cad" type="submit">
              Continuar
            </button>

            <p>
              Já possui conta?{" "}
              <span onClick={() => navigate("/login")} className="link_login">
                Faça Login
              </span>
            </p>
          </form>
        ) : (
          <div className="etapa-planos">
            <h2>Escolha seu plano</h2>
            <Card_planos onSelecionarPlano={handleSelecionarPlano} />
            
            {loading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <div className="spinner"></div>
                  <p>Finalizando seu cadastro...</p>
                  {selectedPlano?.isPremium && <p>Ativando assinatura premium...</p>}
                </div>
              </div>
            )}
            
            {apiError && <div className="error-message">{apiError}</div>}
          </div>
        )}
      </div>

      {showModal && (
        <Mensagem 
          titulo="Confirmação de Cadastro"
          texto={`Você está selecionando o plano ${selectedPlano?.isPremium ? 'Premium (R$ 50,00/mês)' : 'Básico (Grátis)'}. Confirmar?`}
          botoes={[
            { texto: "Confirmar", tipo: "confirmar" },
            { texto: "Cancelar", tipo: "cancelar" }
          ]} 
          onClick={handleModalClick}
        />
      )}
    </div>
  );
}