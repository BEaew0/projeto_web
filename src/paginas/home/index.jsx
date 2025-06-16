import React, { useEffect, useState } from "react";
import { acharUsuario } from "../../services/usuario.js";
import "./home.css";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() 
    {
      try 
      {
        const userData = await acharUsuario();
        console.log('Dados do usuário no componente:', userData);
        setUserName(userData.nomE_USUARIO || "Usuário");
      } 
      catch (error) 
      {
        console.error("Erro ao buscar dados do usuário:", error.message);
      }
    }
    fetchUser();
  }, 
[]);

  return (
    <div className="container-home">
      <h1 className="mostrar-nome">Bem-vindo, {userName ? userName : "Carregando..."}</h1>
    </div>
  );
}
