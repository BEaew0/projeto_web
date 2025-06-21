import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../autenticação';
import MudarInfo from '../../modals/MudarDados';
import Mensagem from '../../modals/Mensagem';
import { FaUser, FaEdit, FaTrash, FaCamera, FaEnvelope, FaLock, FaCalendar } from 'react-icons/fa';
import './card-perfil.css';

const texto = [{
  texto: "Excluir Conta",
  tipo: "primario"
}];
    
export default function Card_perfil() {
  const { logout } = useAuth(); // Obtenha a função de logout do contexto
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: 'Nome do Usuário',
    email: 'email@exemplo.com',
    dataNascimento: '1990-01-01'
  });

  const [modalValues, setModalValues] = useState({
    emailRecuperacao: 'email@exemplo.com',
    novoEmail: '',
    confirmarEmail: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [foto, setFoto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [loadingExclusao, setLoadingExclusao] = useState(false);
  const [erroExclusao, setErroExclusao] = useState('');
  const fileInputRef = useRef(null);

  const dadosUsuario = [
    {
      icone: <FaEnvelope className="icone-dado" />,
      valor: usuario.email,
      tipo: 'email',
      mostraBotao: true
    },
    {
      icone: <FaLock className="icone-dado" />,
      valor: '********',
      tipo: 'senha',
      mostraBotao: true
    },
    {
      icone: <FaCalendar className="icone-dado" />,
      valor: usuario.dataNascimento ? new Date(usuario.dataNascimento).toLocaleDateString() : null,
      tipo: 'dataNascimento',
      mostraBotao: false
    }
  ];

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setModalValues(prev => ({ ...prev, emailRecuperacao: usuario.email }));
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalValues(prev => ({ ...prev, [name]: value }));
  };

  const confirmarExclusao = async () => {
    setLoadingExclusao(true);
    setErroExclusao('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await DesativarUsuario(token);
      
      if (response.success) {
        // Faz logout e redireciona
        logout();
        navigate('/');
      } else {
        setErroExclusao(response.message || 'Falha ao excluir conta');
      }
    } catch (error) {
      console.error('Erro ao desativar conta:', error);
      setErroExclusao('Erro inesperado ao excluir conta');
    } finally {
      setLoadingExclusao(false);
      setMostrarModalExclusao(false);
    }
  };

  return (
    <div className="card-perfil">
      <div className="foto-container" onClick={triggerFileInput}>
        {foto ? (
          <img src={foto} alt="Foto do usuário" className="foto-usuario"/>
        ) : (
          <div className="foto-placeholder">
            <FaUser size={48} color="#666" />
            <div className="foto-overlay">
              <FaCamera size={24} color="white" />
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFotoChange} 
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      <div className="dados-container">
        <div className="modo-visualizacao">
          <h3 className="nome">{usuario.nome}</h3>
          
          {dadosUsuario.map((dado, index) => (
            dado.valor && (
              <p key={index} className="dado">
                {dado.icone} {dado.valor}
                {dado.mostraBotao && (
                  <button 
                    className="botao-alterar-dado"
                    onClick={() => abrirModal(dado.tipo)}
                    aria-label={`Alterar ${dado.tipo}`}
                  >
                    <FaEdit className="icone-editar" />
                  </button>
                )}
              </p>
            )
          ))}
        </div>
      </div>

      <div className="botoes">
        <button 
          className="botao-excluir"
          onClick={() => setMostrarModalExclusao(true)}
          disabled={loadingExclusao}
        >
          <FaTrash className="icone" /> 
          {loadingExclusao ? 'Processando...' : 'Excluir Conta'}
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={fecharModal}>×</button>
            <h2 className="modal-title">
              {modalTipo === 'email' ? 'Alterar Email' : 'Alterar Senha'}
            </h2>
            <MudarInfo 
              tipo={modalTipo}
              values={modalValues}
              onChange={handleModalChange} 
            />
          </div>
        </div>
      )}

      {mostrarModalExclusao && (
        <>
          {texto.map((item, index) => (
            <Mensagem 
              key={index}
              titulo={item.titulo}
              texto={item.texto}
              botoes={item.botoes}
              onClick={(botaoTexto) => {
                if (botaoTexto === "Excluir Conta") {
                  confirmarExclusao();
                } else {
                  setMostrarModalExclusao(false);
                }
              }}
            />
          ))}
          {erroExclusao && (
            <div className="error-message">
              {erroExclusao}
            </div>
          )}
        </>
      )}
    </div>
  );
}