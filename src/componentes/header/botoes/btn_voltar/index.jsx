import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function BtnVoltar() {
    const navigate = useNavigate();
    
    return (
        <div className="btnVoltar_container">
            <button onClick={() => navigate("/pag_inicial")} className="voltar_pag" >
            <GoArrowLeft /> 
        </button>
        </div>
        
    );
}