import "./sobre.css";
import { useState, useRef } from "react";
import Topico from "../../componentes/textos/tópicos";
import Subtopico from "../../componentes/textos/subtopicos";

const topicos = [
    {id:"sobre", texto:"Sobre o TesouroAzul"},
    {id:"como-usar", texto:"Como usar", hasSubtopics: true},
    {id:"como-foi-feito", texto:"Como foi feito"},
    {id:"futuro", texto:"Futuro do Projeto"},
    {id:"desenvolvedores", texto:"Desenvolvedores"}
];

const subtopicos = [
    {id:"iniciando", texto:"Iniciando"},
    {id:"entrar", texto:"Entrar no App"},
    {id:"produtos", texto:"Cadastrando produtos"},
    {id:"graficos", texto:"Gerar gráficos"},
    {id:"relatorios", texto:"Relatório"}
];

const textos = {
    sobre: [
        {
            titulo: "Sobre o Tesouro Azul",
            nome: "sobre-TesouroAzul",
            conteudo: [
                {
                    paragrafo: "O Tesouro Azul é um aplicativo para mobile e desktop focado em gestão de estoque e lucro, desenvolvido especialmente para pequenos negócios, como mercados, lojas, restaurantes e microempreendedores individuais (MEIs). Com uma interface intuitiva e funcionalidades essenciais, ele foi pensado para quem não tem grande expertise em gestão, permitindo o cadastro de produtos, o monitoramento de entradas e saídas, a geração de relatórios de vendas e o cálculo automatizado de margens de lucro."
                },
                {
                    paragrafo: "Ideal para pequenos e médios negócios que buscam praticidade, o Tesouro Azul elimina a necessidade de planilhas manuais ou sistemas complexos, ajudando a reduzir perdas, evitar faltas de estoque e tomar decisões estratégicas com base em dados precisos - tudo de forma acessível e adaptada à realidade de pequenos empreendimentos."
                }
            ]
        }
    ],
    "como-usar": [
        {
            titulo: "Como usar o Tesouro Azul",
            nome: "como-usar",
            conteudo: [
                {
                    id: "iniciando",
                    subtítulo: "Iniciando",
                    texto: "Para inicializar no aplicativo você precisa instalá-lo em seu computador ou celular!",
                },
                {
                    id: "entrar",
                    subtítulo: "Entrar no App",
                    texto: "1. Na tela inicial, insira seu e-mail e senha cadastrados\n2. Clique em 'Entrar' para acessar seu painel\n3. Caso tenha esquecido sua senha, clique em 'Recuperar senha'"
                },
                {
                    id: "produtos",
                    subtítulo: "Cadastrando produtos",
                    texto: "1. Navegue até a seção 'Estoque'\n2. Clique em 'Adicionar Produto'\n3. Preencha todas as informações necessárias\n4. Clique em 'Salvar' para armazenar o produto"
                },
                {
                    id: "graficos",
                    subtítulo: "Gerar gráficos",
                    texto: "1. Acesse a seção 'Relatórios'\n2. Selecione o período desejado\n3. Escolha o tipo de gráfico que deseja visualizar\n4. Clique em 'Gerar' para ver a visualização"
                },
                {
                    id: "relatorios",
                    subtítulo: "Relatórios",
                    texto: "1. Na seção 'Relatórios', selecione o tipo de documento\n2. Defina os filtros necessários\n3. Clique em 'Gerar Relatório'\n4. Escolha entre visualizar na tela ou exportar para PDF"
                },
                {
                    subtítulo: "📦 Cadastro de Produtos",
                    texto: "Na aba 'Estoque', clique em 'Adicionar Produto' para cadastrar novos itens. Preencha nome, código, preço de custo, preço de venda e quantidade inicial."
                },
                {
                    subtítulo: "Gerar gráficos",
                    texto: "Na seção 'Vendas', registre cada transação selecionando os produtos vendidos. O sistema calcula automaticamente o lucro e atualiza o estoque."
                },
                {
                    subtítulo: "📊 Relatórios",
                    texto: "Acesse 'Relatórios' para visualizar gráficos de desempenho, histórico de vendas e projeções de lucro. Você pode filtrar por período específico."
                },
                {
                    subtítulo: "🔔 Alertas",
                    texto: "Configure notificações para quando produtos estiverem com baixo estoque ou quando metas de vendas forem alcançadas."
                }
            ]
        }
    ],
    "como-foi-feito": [
        {
            titulo: "Como foi desenvolvido",
            nome: "como-foi-feito",
            conteudo: [
                {
                    paragrafo: "O Tesouro Azul foi desenvolvido utilizando React.js JavaScript, HTML e CSS para o frontend, Node.js, API .net para o backend. O banco de dados utilizado foi MySqLServer."
                },
                {
                    paragrafo: "O site foi feito com o princípio de carregar vários itens em uma só página."
                }
            ]
        }
    ],
    "futuro": [
        {
            titulo: "Futuro do Projeto",
            nome: "futuro-projeto",
            conteudo: [
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
                }
            ]
        }
    ],
    "desenvolvedores": [
        {
            titulo: "Equipe de Desenvolvimento",
            nome: "desenvolvedores",
            conteudo: [
                {
                    paragrafo: "O Tesouro Azul foi criado por uma equipe multidisciplinar de 4 desenvolvedores da ETEC Lauro Gomes"
                },
                {
                   paragrafo: `Beatriz Souza Coli: Documentação, Front-End Site, Back-end Site, Banco de dados`
                },
                {
                    paragrafo:"Carlos Eduardo de Lima: Desenvolvedor do APP no back-end e no front-end"
                },
                {
                    paragrafo:"Miguel Fônseca Souza:Desenvolvedor  Back-end e banco de dados "
                },
                {
                    paragrafo:"Victor Correia Giacomi:Desenvolvedor Back-end"
                }
            ]
        }
    ]
};

export default function Sobre() {
    const [conteudoAtivo, setConteudoAtivo] = useState("sobre");
    const [topicoAtivo, setTopicoAtivo] = useState("sobre");
    const [subtopicoAtivo, setSubtopicoAtivo] = useState(null);
    const sectionRefs = useRef([]);

    const handleTopicoClick = (id) => {
        setTopicoAtivo(id);
        setConteudoAtivo(id);
        setSubtopicoAtivo(null);
        window.scrollTo(0, 0);
    };

    const handleSubtopicoClick = (index, id) => {
        setConteudoAtivo("como-usar");
        setSubtopicoAtivo(id);
        setTimeout(() => {
            sectionRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    };

    return (
        <div className="main_sobre">
            <aside className="topicos-sobre">
                {topicos.map((topico) => (
                    <div key={topico.id}>
                        <div 
                            onClick={() => handleTopicoClick(topico.id)}
                            className={`topico-item ${topicoAtivo === topico.id ? 'ativo' : ''}`}
                        >
                            <Topico texto={topico.texto} />
                        </div>
                        
                        {topico.id === "como-usar" && (
                            <ul className="subtopicos-container">
                                {subtopicos.map((subtopico, index) => (
                                    <li key={subtopico.id}className={`${subtopicoAtivo === subtopico.id ? 'subtopico-ativo' : ''}`}
                                        onClick={() => handleSubtopicoClick(index, subtopico.id)}>
                                        <Subtopico texto={subtopico.texto} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </aside>
            
            <main className="container-texto">
                {textos[conteudoAtivo].map((item, index) => (
                    <div key={index}>
                        <h1>{item.titulo}</h1>
                        {item.conteudo.map((secao, secaoIndex) => {

                            const subtopicoIndex = subtopicos.findIndex(st => st.id === secao.id);
                            return (

                                <div key={secao.id || secaoIndex} ref={el => sectionRefs.current[subtopicoIndex] = el}id={secao.id}>
                                    {secao.subtítulo && <h2>{secao.subtítulo}</h2>}
                                    {secao.paragrafo ? 
                                    (
                                        <p>{secao.paragrafo}</p>
                                    ) : 
                                    (
                                        <p style={{whiteSpace: "pre-line"}}>{secao.texto}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </main>
        </div>
    );
}