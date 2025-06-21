import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockAcharUsuario,
  mockBuscarTodosEstoques
} from "./estoqueMock";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import GraficosCompactos from "../../componentes/graficos";
import "./home.css";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [estoques, setEstoques] = useState([]);
  const [loadingEstoques, setLoadingEstoques] = useState(true);
  const [errorEstoques, setErrorEstoques] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await mockAcharUsuario();
        setUserName(userData.nomE_USUARIO || "Usuário");
        
        const estoquesData = await mockBuscarTodosEstoques();
        setEstoques(estoquesData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErrorEstoques(error);
      } finally {
        setLoadingEstoques(false);
      }
    }
    fetchData();
  }, []);

  // Agrupa produtos por estoque
  const estoquesAgrupados = estoques.reduce((acc, produto) => {
    const estoqueId = produto.iD_ESTOQUE;
    if (!acc[estoqueId]) {
      acc[estoqueId] = {
        id: estoqueId,
        nome: produto.nomE_ESTOQUE,
        localizacao: produto.localizacao,
        produtos: []
      };
    }
    acc[estoqueId].produtos.push(produto);
    return acc;
  }, {});

  return (
    <div className="container-home">
      <div className="container-titulo">
        <h1 className="mostrar-nome">Bem-vindo, {userName ? userName : "Carregando..."}</h1>
      </div>

      <div className="content-row">
        <div className="container-estoque-user">
          <h2>Estoques</h2>
          
          <div className="estoques-grid">
            {Object.values(estoquesAgrupados).map(estoque => (
              <div key={estoque.id} className="estoque-card">
                <div className="estoque-header">
                  <h3>{estoque.nome}</h3>
                  <p className="estoque-localizacao"></p>
                </div>
                
                <div className="container-lista">
                  <ListaEstoquesCompacta 
                    estoques={estoque.produtos} 
                    loading={loadingEstoques} 
                    error={errorEstoques}  
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
            ))}
          </div>
        </div>

        <div className="container-graficos-user">
          <h2>Gráficos Consolidados</h2>
          <div className="container-gráficos">
            <GraficosCompactos estoques={estoques} />
          </div>
        </div>
      </div>
    </div>
  );
}