//importanto funções, métodos do react,componentes e css
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUser } from "../../services/cadastro.js";
import CadForm from "../../componentes/forms/cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Card_planos from "../../componentes/cards/cards-planos/index.jsx"; // import do componente dos planos
import Logo_ts from "../../assets/Imagens/logo_tcc1.png";

import "./cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  // Estado do formulário
  const [form, setForm] = useState({
    nome_usuario: "",
    CPF_usuario: "",
    CNPJ_usuario: "",
    dta_nascimento: "",
    email_usuario: "",
    conf_email: "",
    senha_cad: "",
    senha_conf: "",
    plano_user: "",
  });

  // Controle de erros e loading
  const [erros, setErrors] = useState({});
  const [apiErro, setApiErro] = useState(null);
  const [loading, setLoading] = useState(false);

  // Controle de etapa: 1 = formulário, 2 = escolha do plano
  const [etapa, setEtapa] = useState(1);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (erros[name]) {
      setErrors((prev) => {
        const newErros = { ...prev };
        delete newErros[name];
        return newErros;
      });
    }
  };

  //validação do form
  const validarForm = () => {
    const Erros = {};

    if (!form.nome_usuario) Erros.nome_usuario = "Nome é obrigatório";
    if (!form.CPF_usuario) Erros.CPF_usuario = "CPF é obrigatório";
    if (!form.dta_nascimento) Erros.dta_nascimento = "Data de nascimento é obrigatória";

    if (!form.email_usuario) {
      Erros.email_usuario = "Email é obrigatório";
    } 
    else if (!/\S+@\S+\.\S+/.test(form.email_usuario)) 
    {
      Erros.email_usuario = "Email inválido";
    }

    if (!form.senha_cad) 
    {
      Erros.senha_cad = "Senha é obrigatória";
    } else if (form.senha_cad.length < 6) 
    {
      Erros.senha_cad = "Senha deve ter pelo menos 6 caracteres";
    }

    if (form.email_usuario !== form.conf_email) Erros.conf_email = "Emails não coincidem";

    if (form.senha_cad !== form.senha_conf) Erros.senha_conf = "Senhas não coincidem";

    setErrors(Erros);

    return Object.keys(Erros).length === 0;
  };

  // Função chamada no submit da etapa 1 (formulário)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setApiErro(null);

    if (validarForm()) {
      setEtapa(2); // passa para escolha do plano
    }
  };

  // Função chamada ao escolher um plano (etapa 2)
  const handleSelecionarPlano = async (planoId, isPremium) => {
    setForm((prev) => ({ ...prev, plano_user: planoId }));
    setLoading(true);
    setApiErro(null);

    try {
      const { conf_email, senha_conf, ...formData } = form;

      const userData = {
        NOME_USUARIO: formData.nome_usuario,
        CPF_USUARIO: formData.CPF_usuario.replace(/\D/g, ""),
        CNPJ_USUARIO: formData.CNPJ_usuario ? formData.CNPJ_usuario.replace(/\D/g, "") : undefined,
        DATA_NASC_USUARIO: formData.dta_nascimento,
        EMAIL_USUARIO: formData.email_usuario,
        SENHA_USUARIO: formData.senha_cad,
        ID_ASSINATURA_FK: Number(planoId),
      };

      const response = await cadastrarUser(userData);

      if (response.success) {
        if (isPremium) {
          alert("Você terá 7 dias grátis para experimentar o plano premium!");
        }
        navigate("/home"); // Ou "/login" conforme preferir
      } else {
        setApiErro(response.message || "Erro ao cadastrar");
        setEtapa(1); // volta para o form se erro
      }
    } catch (err) {
      setApiErro("Erro na conexão com o servidor");
      setEtapa(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main_cadastro">
      <BtnVoltar onClick={() => navigate(-1)} />

      <div className="container_cadastro">
        <img src={Logo_ts} alt="Logo" />

        {etapa === 1 ? (
          <form className="form_cadastro" onSubmit={handleFormSubmit}>
            <CadForm formData={form} onInputChange={inputChange} errors={erros} />

            {apiErro && <div className="menssagem_erro">{apiErro}</div>}

            <button className="btn_cad" type="submit" disabled={loading}>
              {loading ? "Processando..." : "Continuar"}
            </button>

            <p>
              Já possui conta?{" "}
              <span onClick={() => navigate("/login")} className="link_login">
                Faça Login.
              </span>
            </p>
          </form>
        ) : (
          <div>
            {/* Botão voltar para etapa 1 */}
            <button
              className="btn_voltar_etapa"
              onClick={() => setEtapa(1)}
              disabled={loading}
              style={{
                marginBottom: "15px",
                backgroundColor: "#eee",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              ← Voltar
            </button>

            <h2>Escolha seu plano:</h2>
            <Card_planos onSelecionarPlano={handleSelecionarPlano} />
            {apiErro && <div className="menssagem_erro">{apiErro}</div>}
            {loading && <p>Enviando cadastro...</p>}
          </div>
        )}
      </div>
    </div>
  );
}
