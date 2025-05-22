
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CadForm from "../../componentes/forms/Cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./cadastro.css";


export default function Cadastro(){
    const navigate = useNavigate();
   
    return(

        <div className="main_cadastro">
            <BtnVoltar/>

            <div className="container_cadastro">

                <img src={Logo_ts}/>
                <form className="form_cadastro">
                        <CadForm/>
                        
                        <button className="btn_cad" name="cadastro">Cadastro</button>

                        <p>
                            Já possui conta?
                            <span onClick={() => navigate("/login")}className="link_login">
                                Faça Login.
                            </span>
                        </p>      
                </form>
           
            </div>
            
        </div>        
    )

}