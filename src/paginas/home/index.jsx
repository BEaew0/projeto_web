import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { acharUsuario, buscarTodosEstoques } from "../../services/api"; // Chamada real comentada
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import "./home.css";

// Mock da função acharUsuario (adicionado)
async function mockAcharUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nomE_USUARIO: "Ana Souza" }); // Dados mockados
    }, 300);
  });
}

// Mock da função buscarTodosEstoques (adicionado)
async function mockBuscarTodosEstoques() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          nomE_PRODUTO: "Notebook", 
          quantidadE_PRODUTO: 10, 
          datA_ENTRADA: "2023-06-01" 
        },
        { 
          id: 2, 
          nomE_PRODUTO: "Mouse", 
          quantidadE_PRODUTO: 25, 
          datA_ENTRADA: "2023-06-05" 
        }
      ]);
    }, 500);
  });
}

export default function Home() {
  const [userName, setUserName] = useState("");
  const [estoques, setEstoques] = useState([]);
  const [loadingEstoques, setLoadingEstoques] = useState(true);
  const [errorEstoques, setErrorEstoques] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca usuário (substituído por mock)
        // const userData = await acharUsuario(); // Original comentado
        const userData = await mockAcharUsuario(); // Mock adicionado
        setUserName(userData.nomE_USUARIO || "Usuário");
        
        // Busca estoques (substituído por mock)
        // const estoquesData = await buscarTodosEstoques(); // Original comentado
        const estoquesData = await mockBuscarTodosEstoques(); // Mock adicionado
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

  return (
    <div className="container-home">
      <div className="container-titulo">
        <h1 className="mostrar-nome">Bem-vindo, {userName ? userName : "Carregando..."}</h1>
      </div>
      
      <div className="container-lista">
        <h2>Estoque Recente</h2>
        <ListaEstoquesCompacta 
          estoques={estoques} 
          loading={loadingEstoques}  
          error={errorEstoques} 
        />
        
        <div className="ver-mais-container">
          <button 
            className="ver-mais-btn"
            onClick={() => navigate("/estoque")}
          >
            Ver todos os itens
          </button>
        </div>
      </div>
    </div>
  );
}