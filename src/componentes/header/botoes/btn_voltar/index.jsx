import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../../autenticação";
import './voltar.css';

export default function BtnVoltar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loading } = useContext(AuthContext);

    const handleVoltar = () => {
        // Se estiver carregando, não faz nada
        if (loading) return;

        // Se estiver em login ou cadastro, volta para home
        if (location.pathname === '/login' || location.pathname === '/cadastro') {
            navigate('/');
            return;
        }

        // Comportamento quando LOGADO
        if (isAuthenticated) {
            const rotasEspecificas = {
                "/perfil": "/home",
                "/graficos": "/home",
                "/configuracoes": "/home",
                "/estoque": "/home"
            };

            const rotaEspecifica = Object.keys(rotasEspecificas).find(path => 
                location.pathname.startsWith(path)
            );

            if (rotaEspecifica) {
                navigate(rotasEspecificas[rotaEspecifica]);
            } else {
                navigate(-1);
            }
        } 
        // Comportamento quando DESLOGADO
        else {
            // Força recarregar a página para garantir que todos os estados sejam resetados
            window.location.href = '/';
        }
    };
    
    return (
        <div className="btn-voltar-container">
            <button 
                onClick={handleVoltar} 
                className="btn-voltar" 
                aria-label="Voltar"
                disabled={loading} // Desabilita o botão durante o loading
            >
                <GoArrowLeft className="btn-voltar-icone" />
            </button>
        </div>
    );
}