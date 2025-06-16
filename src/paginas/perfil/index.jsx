import { useEffect, useState } from "react";
import { acharUsuario } from "../../services/usuario";
import Card_perfil from "../../componentes/cards/card-perfil";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";

export default function PerfilUsuario() {

  return (
    <div className="container-perfil">
      <BtnVoltar/>

          <Card_perfil/>
   
    </div>
  );
}
