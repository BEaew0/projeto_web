import { useNavigate } from "react-router-dom";
import Card_planos from "../../componentes/cards/cards-planos";
import "./planos.css";
import Loading from '../../componentes/loading';

export default function Planos() {
  const navigate = useNavigate();

  const handleSelecionarPlano = (planoId, isPremium) => {
    if (isPremium) {
      // Redireciona para checkout de planos premium
      navigate(`/checkout/${planoId}`);
    } else {
      // Lógica para plano gratuito
      assinarPlanoGratuito(planoId);
    }
  };

  const assinarPlanoGratuito = async (planoId) => {
    try {
      // Implemente sua chamada API para assinar o plano gratuito
      console.log(`Assinando plano gratuito ${planoId}`);
      
      // Após sucesso:
      navigate('/home'); // Ou para onde fizer sentido
    } catch (error) {
      console.error("Erro ao assinar plano:", error);
    }
  };

  return (
    <div className="planos-layout">
      <Card_planos onSelecionarPlano={handleSelecionarPlano} />
    </div>
  );
}