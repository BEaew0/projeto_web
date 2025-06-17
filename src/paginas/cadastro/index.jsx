import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { cadastrarUser } from "../../services/cadastro.js"; // API real (comentada)
import CadForm from "../../componentes/forms/cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Card_planos from "../../componentes/cards/cards-planos/index.jsx";
import Logo_ts from "../../assets/Imagens/logo_tcc1.png";
import Mensagem from "../../componentes/modals/Mensagem/index.jsx";
import "./cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();
  
  // Estado do formulário com valores mockados para testes
  const [form, setForm] = useState({
    nome_usuario: "Fulano de Tal", // Mock
    CPF_usuario: "123.456.789-00", // Mock
    CNPJ_usuario: "",
    dta_nascimento: "1990-01-01", // Mock
    email_usuario: "teste@example.com", // Mock
    conf_email: "teste@example.com", // Mock
    senha_cad: "123456", // Mock
    senha_conf: "123456", // Mock
  });

  const [erros, setErrors] = useState({});
  const [etapa, setEtapa] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(null);
  const [loading, setLoading] = useState(false); // Mantido para exemplo de loading

  const inputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
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
    
    // Validações básicas para teste
    if (!form.nome_usuario) Erros.nome_usuario = "Nome é obrigatório";
    if (!form.email_usuario) Erros.email_usuario = "Email é obrigatório";
    if (!form.senha_cad) Erros.senha_cad = "Senha é obrigatória";
    if (form.email_usuario !== form.conf_email) Erros.conf_email = "Emails não coincidem";
    if (form.senha_cad !== form.senha_conf) Erros.senha_conf = "Senhas não coincidem";

    setErrors(Erros);
    return Object.keys(Erros).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validarForm()) {
      setEtapa(2); // Vai para a etapa de seleção de plano
    }
  };

  // Função mock para substituir a chamada à API
  const mockCadastrarUsuario = () => {
    console.log("Dados que seriam enviados para a API:", {
      ...form,
      plano_selecionado: selectedPlano
    });
    
    setLoading(true);
    
    // Simula delay de requisição
    setTimeout(() => {
      setLoading(false);
      navigate("/login", { 
        state: { 
          mensagem: "Cadastro teste realizado! (Dados apenas no console)",
          cadastroMock: true 
        }
      });
    }, 1500);
  };

  const handleSelecionarPlano = (planoId, isPremium) => {
    setSelectedPlano({ planoId, isPremium });
    setShowModal(true);
  };

  const handleModalClick = (acao) => {
    setShowModal(false);
    if (acao === "Confirmar") {
      mockCadastrarUsuario(); // Usa a função mock em vez da API real
    }
  };

  return (
    <div className="main_cadastro">
      <BtnVoltar onClick={() => etapa === 1 ? navigate(-1) : setEtapa(1)} />

      <div className="container_cadastro">
        <img src={Logo_ts} alt="Logo" />

        {etapa === 1 ? (
          <form className="form_cadastro" onSubmit={handleFormSubmit}>
            <CadForm formData={form} onInputChange={inputChange} errors={erros} />

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
            <h2>Escolha seu plano (Modo Teste)</h2>
            <Card_planos onSelecionarPlano={handleSelecionarPlano} />
          </div>
        )}
      </div>

      {showModal && (
        <Mensagem 
          titulo="Confirmação (Teste)"
          texto="Isso é apenas uma simulação. Os dados serão exibidos no console."
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