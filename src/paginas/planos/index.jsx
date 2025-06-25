import { useNavigate } from "react-router-dom";
import { useAuth } from "../../componentes/autenticação/index"; // Importe o useAuth
import Card_planos from "../../componentes/cards/cards-planos";
import "./planos.css";
import Loading from '../../componentes/loading';

export default function Planos() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Obtenha o estado de autenticação

  const handleSelecionarPlano = (planoId, isPremium) => {
    if (isPremium) {
      // Redireciona para checkout de planos premium
      navigate(`/login`);
    } else {
      // Verifica se está logado antes de assinar plano gratuito
      if (!isAuthenticated) {
        // Redireciona para login com state para voltar após login
        navigate('/login', { state: { from: '/planos' } });
        return;
      }
      // Lógica para plano gratuito
      assinarPlanoGratuito(planoId);
    }
  };

  const assinarPlanoGratuito = async (planoId) => {
    try {
      // Mostrar loading enquanto processa
      // Implemente sua chamada API para assinar o plano gratuito
      console.log(`Assinando plano gratuito ${planoId}`);
      
      // Após sucesso:
      navigate('/home'); // Ou para onde fizer sentido
    } catch (error) {
      console.error("Erro ao assinar plano:", error);
      // Mostrar mensagem de erro para o usuário
    }
  };

  return (
    <div className="planos-layout">
      <Card_planos onSelecionarPlano={handleSelecionarPlano} />
    </div>
  );
}