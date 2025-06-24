import { useState } from "react";
import Input from "../../input";
import { alterarEmailUsuario, alterarSenhaUsuario } from "../../../services/alterardados";
import { useAuth } from "../../autenticação/index";

const camposFormulario = {
  email: [
    {
      texto: "Novo Email",
      name: "novoEmail",
      id: "novo-email",
      type: "email",
      required: true,
      placeholder: "Digite seu novo email"
    },
    {
      texto: "Confirmar Email",
      name: "confirmarEmail",
      id: "confirmar-email",
      type: "email",
      required: true,
      placeholder: "Confirme o novo email"
    }
  ],
  senha: [
    {
      texto: "Senha Atual",
      name: "senhaAtual",
      id: "senha-atual",
      type: "password",
      required: true,
      placeholder: "Digite sua senha atual"
    },
    {
      texto: "Nova Senha",
      name: "novaSenha",
      id: "nova-senha",
      type: "password",
      required: true,
      placeholder: "Digite sua nova senha"
    },
    {
      texto: "Confirmar Nova Senha",
      name: "confirmarNovaSenha",
      id: "confirmar-nova-senha",
      type: "password",
      required: true,
      placeholder: "Confirme a nova senha"
    }
  ]
};

export default function MudarInfo({ tipo }) {
  const { token } = useAuth();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Limpa erros quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (tipo === 'email') {
      if (!values.novoEmail) {
        newErrors.novoEmail = 'Email é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(values.novoEmail)) {
        newErrors.novoEmail = 'Email inválido';
      }
      
      if (values.novoEmail !== values.confirmarEmail) {
        newErrors.confirmarEmail = 'Emails não coincidem';
      }
    }
    
    if (tipo === 'senha') {
      if (!values.senhaAtual) {
        newErrors.senhaAtual = 'Senha atual é obrigatória';
      }
      
      if (!values.novaSenha) {
        newErrors.novaSenha = 'Nova senha é obrigatória';
      } else if (values.novaSenha.length < 8) {
        newErrors.novaSenha = 'Senha deve ter no mínimo 8 caracteres';
      }
      
      if (values.novaSenha !== values.confirmarNovaSenha) {
        newErrors.confirmarNovaSenha = 'Senhas não coincidem';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(false);
    
    try {
      let response;
      
      if (tipo === 'email') {
        response = await alterarEmailUsuario(values.novoEmail, token);
      } else if (tipo === 'senha') {
        response = await alterarSenhaUsuario(values.novaSenha, token);
      }
      
      if (response.success) {
        setSuccess(true);
        setValues({});
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setErrors(prev => ({ ...prev, form: response.message }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, form: 'Erro ao processar requisição' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form-container form-${tipo}`}>
      <form onSubmit={handleSubmit}>
        {camposFormulario[tipo]?.map((input, index) => (
          <div key={index} className="input-group">
            <Input
              type={input.type}
              texto={input.texto}
              name={input.name}
              id={input.id}
              required={input.required}
              placeholder={input.placeholder}
              value={values[input.name] || ''}
              onChange={handleChange}
              error={errors[input.name]}
            />
          </div>
        ))}

        {errors.form && (
          <div className="error-message">{errors.form}</div>
        )}

        {success && (
          <div className="success-message">
            {tipo === 'email' ? 'Email alterado com sucesso!' : 'Senha alterada com sucesso!'}
          </div>
        )}

        <button type="submit" className="btn_enviar"disabled={loading}>
          {loading ? 'Processando...' : 'Confirmar Alteração'}
        </button>
      </form>
    </div>
  );
}