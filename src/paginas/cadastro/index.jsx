
import { useState } from "react";
import apiTS from "../../services/api";
import CadForm from "../../componentes/forms/Cadastro";



export default function Cadastro(){
    const[dadosForm, setDadosForm] = useState({});
    const [carregar, setCarregar] = useState(false);
    const[erro,setErro]=useState(null);
    const[sucesso,setSucesso]=useState(false);

    //pega os dados do formulario
    const formData=(data)=>{
        setDadosForm(dadosForm);
    }

    const envioDados=async (erro)=>{
        erro.preventDefault();

        if(!formData.nome ||!formData.dataNascimento||! !formData.CPF|| !formData.email){} 
    }


    return(
            <form>
             <CadForm/>
             <button className="btn_cadastro" name="cadastro">Cadastro</button>
            </form>
           
    )

}