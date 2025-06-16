import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useLocation} from "react-router-dom";

export default function BtnVoltar() {
    const navigate = useNavigate();
    const location = useLocation();

    const rota=()=>{
        if(location.pathname==="/perfil"){
            navigate(-1);
        }
        else navigate("/");
    }
    
    return (
        <div className="btnVoltar_container">
            <button onClick={rota} className="voltar_pag" >
            <GoArrowLeft /> 
        </button>
        </div>
        
    );
}