import { useEffect, useState } from "react";
import { acharUsuario } from "../../services/usuario";

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await acharUsuario();
        setUsuario(dados);
      } catch (err) 
      {
        console.error("Erro ao carregar dados do usuário", err);
      }
    }
    carregarDados();
  }, []);

  return (
    <div>
      {usuario ? 
      (
        <>
          <p>Nome: {usuario.nomE_USUARIO}</p>
          <p>Email: {usuario.emaiL_USUARIO}</p>
          <p>Senha: ******</p>
          <img src={usuario.fotO_USUARIO} alt="Foto do usuário" width={100} />
        </>
      ) : 
      (
        <p>Carregando...</p>
      )}
    </div>
  );
}
