import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarTodosEstoquesUser } from "../../services/estoque"; // API real
import { acharUsuario } from "../../services/usuario"; // API real
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
        const usuario = await acharUsuario();
        const nomeUsuario = usuario.nomE_USUARIO?.trim() || "Usuário";
        setDadosUsuario({ nome: nomeUsuario, carregando: false, erro: null });

        const dadosEstoques = await buscarTodosEstoquesUser();
        setEstoques({ dados: dadosEstoques, carregando: false, erro: null });

      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        setDadosUsuario(prev => ({
          ...prev,
          carregando: false,
          erro: erro.message || "Erro ao carregar dados do usuário"
        }));
        setEstoques(prev => ({
          ...prev,
          carregando: false,
          erro: erro.message || "Erro ao carregar estoques"
        }));
      }
    };

    carregarDados();
  }, []);

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
        <div className="container-user">
          <h2>Produtos</h2>

          {estoques.carregando ? (
            <p>Carregando produtos...</p>
          ) : estoques.erro ? (
            <p>Erro ao carregar produtos: {estoques.erro}</p>
          ) : (
            <div className="estoques-grid">
              <ListaEstoquesCompacta
                estoques={estoques.dados}
                carregando={estoques.carregando}
                erro={estoques.erro}
                mostrarTodos={true}
              />

              <div className="ver-mais-container">
                <button
                  className="ver-mais-btn"
                  onClick={() => navigate("/estoque", { state: { estoques: estoques.dados } })}
                >
                  Ver todos os produtos
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="container-graficos-user">
          <h2>Relatórios</h2>
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
