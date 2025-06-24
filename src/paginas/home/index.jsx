import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { buscarTodosEstoquesUser } from "../../services/estoque"; // API comentada
//import { acharUsuario } from "../../services/usuario"; // API comentada
import { mockAcharUsuario, mockBuscarTodosEstoques } from "./estoqueMock";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import GraficosCompactos from "../../componentes/graficos";
import "./home.css";

export default function Home() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    carregando: true,
    erro: null
  });
  
  const [estoques, setEstoques] = useState({
    dados: [],
    carregando: true,
    erro: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Busca dados do usuário (usando mock)
        const usuario = await mockAcharUsuario();
        setDadosUsuario({
          nome: usuario.nomE_USUARIO || "Usuário",
          carregando: false,
          erro: null
        });

        // Busca dados de estoques (usando mock)
        const dadosEstoques = await mockBuscarTodosEstoques();
        setEstoques({
          dados: dadosEstoques,
          carregando: false,
          erro: null
        });
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        setDadosUsuario(prev => ({
          ...prev,
          carregando: false,
          erro: erro.message
        }));
        setEstoques(prev => ({
          ...prev,
          carregando: false,
          erro: erro.message
        }));
      }
    };

    carregarDados();
  }, []);

  // Agrupa produtos por estoque
  const estoquesAgrupados = estoques.dados.reduce((acumulador, produto) => {
    const idEstoque = produto.iD_ESTOQUE;
    if (!acumulador[idEstoque]) {
      acumulador[idEstoque] = {
        id: idEstoque,
        nome: produto.nomE_ESTOQUE,
        localizacao: produto.localizacao,
        produtos: []
      };
    }
    acumulador[idEstoque].produtos.push(produto);
    return acumulador;
  }, {});

  return (
    <div className="container-home">
      <div className="container-titulo">
        <h1 className="mostrar-nome">
          {dadosUsuario.carregando 
            ? "Carregando..." 
            : dadosUsuario.erro
              ? "Erro ao carregar dados"
              : `Bem-vindo, ${dadosUsuario.nome}`}
        </h1>
      </div>

      <div className="content-row">
        <div className="containernpm -user">

          <h2>Estoques</h2>
          
          <div className="estoques-grid">
            {estoques.carregando ? (
              <p>Carregando estoques...</p>
            ) : estoques.erro ? (
              <p>Erro ao carregar estoques: {estoques.erro}</p>
            ) : (
              Object.values(estoquesAgrupados).map(estoque => (
                <div key={estoque.id} className="estoque-card">
                  <div className="estoque-header">
                    <h3>{estoque.nome}</h3>
                    <p className="estoque-localizacao">{estoque.localizacao}</p>
                  </div>
                  
                  <div className="container-lista">
                    <ListaEstoquesCompacta 
                      estoques={estoque.produtos} 
                      carregando={estoques.carregando} 
                      erro={estoques.erro}  
                      mostrarTodos={false}
                    />
                    
                    <div className="ver-mais-container">
                      <button 
                        className="ver-mais-btn" 
                        onClick={() => navigate("/estoque", { state: { estoques: estoque.produtos } })}
                      >
                        Ver itens deste estoque
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="container-graficos-user">
          <h2>Gráficos Consolidados</h2>
          <div className="container-gráficos">
            <GraficosCompactos 
              estoques={estoques.dados} 
              carregando={estoques.carregando}
            />
          </div>
        </div>
      </div>
    </div>
  );
}