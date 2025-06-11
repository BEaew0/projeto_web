import "./sobre.css";
import { useState } from "react";
import Topico from "../../componentes/textos/tópicos";
import Texto from "../../componentes/textos/textos";

const topicos = [
    {id:"sobre", texto:"Sobre o TesouroAzul"},
    {id:"como-usar", texto:"Como usar"},
    {id:"como-foi-feito", texto:"Como foi feito"},
    {id:"futuro", texto:"Futuro do Projeto"},
    {id:"desenvolvedores", texto:"Desenvolvedores"}
];

const textos = {
    sobre: [
        {
            titulo: "Sobre o Tesouro Azul",
            subtitulo: false,
            nome: "sobre-TesouroAzul",
            texto: [
                {
                    paragrafo: "O Tesouro Azul é um aplicativo para mobile e desktop focado em gestão de estoque e lucro, desenvolvido especialmente para pequenos negócios, como mercados, lojas, restaurantes e microempreendedores individuais (MEIs). Com uma interface intuitiva e funcionalidades essenciais, ele foi pensado para quem não tem grande expertise em gestão, permitindo o cadastro de produtos, o monitoramento de entradas e saídas, a geração de relatórios de vendas e o cálculo automatizado de margens de lucro."
                },
                {
                    paragrafo: "Ideal para comerciantes que buscam praticidade, o Tesouro Azul elimina a necessidade de planilhas manuais ou sistemas complexos, ajudando a reduzir perdas, evitar faltas de estoque e tomar decisões estratégicas com base em dados precisos - tudo de forma acessível e adaptada à realidade de pequenos empreendimentos."
                },
            ]
        },
    ],
    "como-usar": [
        {
            titulo: "Como usar o Tesouro Azul",
            subtitulo: false,
            nome: "como-usar",
            texto: [
                {
                    paragrafo: "1. Cadastro de Produtos: Na aba 'Estoque', clique em 'Adicionar Produto' para cadastrar novos itens. Preencha nome, código, preço de custo, preço de venda e quantidade inicial."
                },
                {
                    paragrafo: "2. Controle de Vendas: Na seção 'Vendas', registre cada transação selecionando os produtos vendidos. O sistema calcula automaticamente o lucro e atualiza o estoque."
                },
                {
                    paragrafo: "3. Relatórios: Acesse 'Relatórios' para visualizar gráficos de desempenho, histórico de vendas e projeções de lucro. Você pode filtrar por período específico."
                },
                {
                    paragrafo: "4. Alertas: Configure notificações para quando produtos estiverem com baixo estoque ou quando metas de vendas forem alcançadas."
                }
            ]
        }
    ],
    "como-foi-feito": [
        {
            titulo: "Como foi desenvolvido",
            subtitulo: false,
            nome: "como-foi-feito",
            texto: [
                {
                    paragrafo: "O Tesouro Azul foi desenvolvido utilizando React.js para o frontend e Node.js com Express para o backend. O banco de dados escolhido foi o MongoDB pela sua flexibilidade e escalabilidade."
                },
                {
                    paragrafo: "A interface foi projetada seguindo os princípios de UX Design, com testes de usabilidade realizados com pequenos comerciantes para garantir a intuitividade. Utilizamos a biblioteca Chart.js para as visualizações de dados e React Native para a versão mobile."
                },
                {
                    paragrafo: "O desenvolvimento levou 8 meses, incluindo fase de pesquisa, prototipagem, testes com usuários reais e implementação das funcionalidades principais."
                }
            ]
        }
    ],
    "futuro": [
        {
            titulo: "Futuro do Projeto",
            subtitulo: false,
            nome: "futuro-projeto",
            texto: [
                {
                    paragrafo: "Para as próximas versões do Tesouro Azul, planejamos implementar:"
                },
                {
                    paragrafo: "- Integração com marketplaces (Mercado Livre, Shopee) para sincronização automática de vendas"
                },
                {
                    paragrafo: "- Versão offline para locais sem conexão com internet"
                },
                {
                    paragrafo: "- Sistema de gestão de clientes e fidelidade"
                },
                {
                    paragrafo: "- Análise preditiva de vendas baseada em inteligência artificial"
                }
            ]
        }
    ],
    "desenvolvedores": [
        {
            titulo: "Equipe de Desenvolvimento",
            subtitulo: false,
            nome: "desenvolvedores",
            texto: [
                {
                    paragrafo: "O Tesouro Azul foi criado por uma equipe multidisciplinar de 4 desenvolvedores"
                },
                {
                    paragrafo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies."
                }
               
            ]
        }
    ]
};

export default function Sobre() {
    const [conteudoAtivo, setConteudoAtivo] = useState("sobre");

    return (
        <div className="main_sobre">
            <aside className="topicos-sobre">
                {topicos.map((topico) => (
                    <div key={topico.id} onClick={() => setConteudoAtivo(topico.id)}>
                        <Topico 
                            texto={topico.texto}
                        />
                    </div>
                ))}
            </aside>
            
            <main className="container-texto">
                {textos[conteudoAtivo].map((item, index) => (
                    <Texto 
                        key={index}
                        título={item.titulo}
                        subtítulo={item.subtitulo}
                        name={item.nome}
                        paragrafo={item.texto}
                    />
                ))}
            </main>
        </div>
    );
}