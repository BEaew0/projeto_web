import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import './voltar.css'; // Arquivo de estilos que vamos criar

export default function BtnVoltar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleVoltar = () => {
        // Páginas específicas com rotas customizadas
        const rotasEspecificas = {
            "/perfil": "/home",
            "/produto/detalhes": "/estoque",
            "/configuracoes": "/"
        };

        // Verifica se está em uma rota com destino específico
        const rotaEspecifica = Object.keys(rotasEspecificas).find(path => 
            location.pathname.startsWith(path)
        );

        if (rotaEspecifica) {
            navigate(rotasEspecificas[rotaEspecifica]);
        } else {
            navigate(-1); // Volta para a página anterior por padrão
        }
    };
    
    return (
        <div className="btn-voltar-container">
            <button onClick={handleVoltar} className="btn-voltar"aria-label="Voltar">
                <GoArrowLeft className="btn-voltar-icone" />
        
            </button>
        </div>
    );
}