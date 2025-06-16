import "./card-planos.css";

const planos = [
  {
    id: 1,
    titulo: "Plano gratuito",
    valor: 0.0,
    texto: [
      { id: 1, item: "Acesso básico aos recursos principais" },
      { id: 2, item: "Suporte por email com resposta em até 48h" },
      { id: 3, item: "Armazenamento de 1GB" },
      { id: 4, item: "Relatórios básicos de desempenho" },
    ],
  },
  {
    id: 2,
    titulo: "Plano Premium",
    valor: 50.0,
    texto: [
      { id: 1, item: "Gráficos de análise mais avançados" },
      { id: 2, item: "Criação ilimitada de metas" },
      { id: 3, item: "Insights de lucro" },
      { id: 4, item: "Armazenamento de 10GB" },
      { id: 5, item: "Relatórios avançados de desempenho" },
    ],
  },
];

export default function Card_planos({ onSelecionarPlano }) {
  return (
    <div className="cards-planos">
      {planos.map((plano) => (
        <div key={plano.id} className="card-planos card-azul">
          <h1>{plano.titulo}</h1>

   
          <ul className="beneficios-lista">
            {plano.texto.map((beneficio) => (
              <li key={beneficio.id}>• {beneficio.item}</li>
            ))}
          </ul>

          <p className="valor">Valor: R$ {plano.valor.toFixed(2).replace('.', ',')}</p>

          <button className="btn_obter" onClick={() => onSelecionarPlano(plano.id, plano.valor > 0)}>
            Obter
          </button>
        </div>
  
      ))}
    </div>
  );
}
