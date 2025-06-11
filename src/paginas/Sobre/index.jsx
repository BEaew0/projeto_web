import "./sobre.css";



export default function Sobre() {
    return (
        <div className="main_sobre">
            <aside className="topicos-sobre">
                <h2>Tópicos Relacionados</h2>
                <ul>
                    <li><strong>Sobreo o TesouroAzul</strong></li>
                    <li><strong>Como usar</strong>-</li>
                    <li><strong></strong></li>
                    <li><strong>Impacto Social</strong></li>
                    <li><strong>Parcerias</strong> </li>
                    <li><strong>Prêmios e Reconhecimentos</strong> </li>
                    <li><strong>Futuro do Projeto</strong> </li>
                    <li><strong>Como </strong> </li>
                </ul>
      
            </aside>
            
            <main className="main-sobre">
                <h1>Sobre o TesouroAzul</h1>
                <p>
                    O TesouroAzul é um Software de gestão de estoque e 
                </p>
                <p>
                    Trabalhamos em parceria com governos, ONGs e comunidades locais para desenvolver soluções eficientes contra a poluição dos mares.
                    Nossa equipe é composta por biólogos, engenheiros e voluntários dedicados a fazer a diferença.
                </p>
            
            </main>
        </div>
    );
}