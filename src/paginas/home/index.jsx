import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { acharUsuario, buscarTodosEstoques } from "../../services/api"; // Chamada real comentada
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import  GraficosCompactos from "../../componentes/graficos";
import "./home.css";

// Mock da função acharUsuario (adicionado)
async function mockAcharUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nomE_USUARIO: "Ana Souza" }); // Dados mockados
    }, 300);
  });
}

// Mock da função buscarTodosEstoques (adicionado) com 15 itens
async function mockBuscarTodosEstoques() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          nomE_PRODUTO: "Notebook Dell Inspiron", 
          quantidadE_PRODUTO: 10, 
          datA_ENTRADA: "2023-06-01" 
        },
        { 
          id: 2, 
          nomE_PRODUTO: "Mouse sem fio Logitech", 
          quantidadE_PRODUTO: 25, 
          datA_ENTRADA: "2023-06-05" 
        },
        { 
          id: 3, 
          nomE_PRODUTO: "Teclado mecânico RGB", 
          quantidadE_PRODUTO: 15, 
          datA_ENTRADA: "2023-06-10" 
        },
        { 
          id: 4, 
          nomE_PRODUTO: "Monitor 24\" Full HD", 
          quantidadE_PRODUTO: 8, 
          datA_ENTRADA: "2023-06-12" 
        },
        { 
          id: 5, 
          nomE_PRODUTO: "Headphone Bluetooth", 
          quantidadE_PRODUTO: 20, 
          datA_ENTRADA: "2023-06-15" 
        },
        { 
          id: 6, 
          nomE_PRODUTO: "Webcam 1080p", 
          quantidadE_PRODUTO: 12, 
          datA_ENTRADA: "2023-06-18" 
        },
        { 
          id: 7, 
          nomE_PRODUTO: "SSD 1TB NVMe", 
          quantidadE_PRODUTO: 30, 
          datA_ENTRADA: "2023-06-20" 
        },
        { 
          id: 8, 
          nomE_PRODUTO: "Hub USB-C 7 portas", 
          quantidadE_PRODUTO: 18, 
          datA_ENTRADA: "2023-06-22" 
        },
        { 
          id: 9, 
          nomE_PRODUTO: "Impressora multifuncional", 
          quantidadE_PRODUTO: 5, 
          datA_ENTRADA: "2023-06-25" 
        },
        { 
          id: 10, 
          nomE_PRODUTO: "Tablet Samsung Galaxy", 
          quantidadE_PRODUTO: 7, 
          datA_ENTRADA: "2023-06-28" 
        },
        { 
          id: 11, 
          nomE_PRODUTO: "Cadeira gamer ergonômica", 
          quantidadE_PRODUTO: 3, 
          datA_ENTRADA: "2023-07-01" 
        },
        { 
          id: 12, 
          nomE_PRODUTO: "Roteador Wi-Fi 6", 
          quantidadE_PRODUTO: 14, 
          datA_ENTRADA: "2023-07-05" 
        },
        { 
          id: 13, 
          nomE_PRODUTO: "Power bank 20000mAh", 
          quantidadE_PRODUTO: 22, 
          datA_ENTRADA: "2023-07-08" 
        },
        { 
          id: 14, 
          nomE_PRODUTO: "Mousepad grande", 
          quantidadE_PRODUTO: 35, 
          datA_ENTRADA: "2023-07-10" 
        },
        { 
          id: 15, 
          nomE_PRODUTO: "Adaptador HDMI para VGA", 
          quantidadE_PRODUTO: 40, 
          datA_ENTRADA: "2023-07-12" 
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
      } catch (error) 
      {
        console.error("Erro ao buscar dados:", error);
        setErrorEstoques(error);
      } finally 
      {
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


     <div className="container-estoque-user">
        <h2>Estoques</h2>
          <div className="container-lista">
           <h2>Estoque Recente</h2>
              <ListaEstoquesCompacta estoques={estoques} loading={loadingEstoques} error={errorEstoques}  mostrarTodos={false}/>
        
              <div className="ver-mais-container">
                <button className="ver-mais-btn" onClick={() => navigate("/estoque",{ state: { estoques } })}>
                   Ver todos os itens
                </button>
              </div>
      </div>
     </div>

     <div className="container-graficos-user">
          <h2>Gráficos</h2>
          <div className="container-gráficos">
              <GraficosCompactos estoques={estoques} />
         </div>
     </div>


  </div>
  );
}