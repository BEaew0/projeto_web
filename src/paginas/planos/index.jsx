import Card_planos from "../../componentes/cards/cards-planos";
import "./planos.css";

const planos = [
  {
    titulo: "Plano gratuito",
    valor: 0.00,
    texto: [
      { id: 1, item: "Acesso básico aos recursos principais" },
      { id: 2, item: "Suporte por email com resposta em até 48h" },
      { id: 3, item: "Armazenamento de 1GB" },
      { id: 4, item: "Relatórios básicos de desempenho" }
    ],
    button: true
  },
  {
    titulo: "Plano Premium",
    valor: 50.00,
    texto: [
      { id: 1, item: "Gráficos de análise mais avançados" },
      { id: 2, item: "Criação ilimitada de metas" },
      { id: 3, item: "Insights de lucro" },
      { id: 4, item: "Armazenamento de 10GB" },
      { id: 5, item: "Relatórios avançados de desempenho" }
    ],
    button: true
  }
];

export default function Planos() {
  return (

  <div className="planos-layout">
    <div className="cards-planos">
        {planos.map((plano, key) => (
          <Card_planos  key={key} titulo={plano.titulo} valor={plano.valor}  texto={plano.texto} button={plano.button} />
        ))}

    </div>
  </div>
      
  );
}