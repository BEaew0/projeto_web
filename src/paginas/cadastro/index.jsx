
import { useState } from "react";
import apiTS from "../../services/api";
import CadForm from "../../componentes/forms/Cadastro";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import Logo_ts from "./../../assets/Imagens/logo_tcc1.png";
import "./cadastro.css";


export default function Cadastro(){
    const[dadosForm, setDadosForm] = useState({});


    //pega os dados do formulario
    const formData=(data)=>{
        setDadosForm(dadosForm);
    }

    const envioDados=async (erro)=>{
        erro.preventDefault();

        if(!formData.nome ||!formData.dataNascimento||! !formData.CPF|| !formData.email){} 
    }

    return(

        <div className="main_cadastro">
            <BtnVoltar/>

            <div className="container_cadastro">

                <img src={Logo_ts}/>
                <form className="form_cadastro">
                        <CadForm/>
                        <button className="btn_cad" name="cadastro">Cadastro</button>
                </form>
           
            </div>
            
        </div>
            
    )

}