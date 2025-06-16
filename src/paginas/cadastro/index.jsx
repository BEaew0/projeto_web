//importanto funções, métodos do react,componentes e css
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUser } from "../../services/cadastro.js";
import CadForm from "../../componentes/forms/cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Logo_ts from "../../assets/Imagens/logo_tcc1.png";

import "./cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  //limpando os inputs dos forms
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

  const [erros, setErrors] = useState({});
  const [apiErro, setApiErro] = useState(null);
  const [loading, setLoading] = useState(false);

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

    if (!form.plano_user) Erros.plano_user = "Selecione um plano";

    if (form.email_usuario !== form.conf_email) Erros.conf_email = "Emails não coincidem";

    if (form.senha_cad !== form.senha_conf) Erros.senha_conf = "Senhas não coincidem";

    setErrors(Erros);

    return Object.keys(Erros).length === 0;
  };

//função assíncronapara enviar os dados
  const enviarDados = async (e) => {
    e.preventDefault();
    setApiErro(null);

    if (!validarForm()) return;

    setLoading(true);

    try {

      // Remove conf_email e senha_conf antes de enviar
      const { conf_email, senha_conf, ...formData } = form;

      // Mapeia os campos para o formato esperado pela API
      const userData = {
        NOME_USUARIO: formData.nome_usuario,
        CPF_USUARIO: formData.CPF_usuario.replace(/\D/g, ""),
        CNPJ_USUARIO: formData.CNPJ_usuario ? formData.CNPJ_usuario.replace(/\D/g, "") : undefined,
        DATA_NASC_USUARIO: formData.dta_nascimento,
        EMAIL_USUARIO: formData.email_usuario,
        SENHA_USUARIO: formData.senha_cad,
        ID_ASSINATURA_FK: Number(formData.plano_user) || 1,
      };

      const response = await cadastrarUser(userData);

      //se conseguir cadastrar ele manda o usuário para a páginade Login
      if (response.success) {
        navigate("/login", {
          state: {
            registro: true,
            email: form.email_usuario,
          },
        });
      } else 
      {
        setApiErro(response.message || "Erro ao cadastrar");
      }
    } 
    catch (e) 
    {
      setApiErro("Erro na conexão com o servidor");
    } 
    finally 
    {
      setLoading(false);
    }
  };

  //mostrando oscomponentes na telacom HTML
  return (
    <div className="main_cadastro">
      <BtnVoltar onClick={() => navigate(-1)} />

      <div className="container_cadastro">
        <img src={Logo_ts} alt="Logo" />

        <form className="form_cadastro" onSubmit={enviarDados}>
          <CadForm formData={form} onInputChange={inputChange} errors={erros} />

          {apiErro && <div className="menssagem_erro">{apiErro}</div>}

          <button className="btn_cad" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p>
            Já possui conta?{" "}
            <span onClick={() => navigate("/login")} className="link_login">
              Faça Login.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
