// components/Card_perfil/Card_perfil.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../autenticação';
import MudarInfo from '../../modals/MudarDados';
import Mensagem from '../../modals/Mensagem';
import { FaUser, FaEdit, FaTrash, FaCamera, FaEnvelope, FaLock, FaCalendar } from 'react-icons/fa';
import { acharUsuario } from '../../../services/usuario';
import { alterarEmailUsuario, alterarSenhaUsuario } from '../../../services/alterardados';
import { DesativarUsuario } from '../../../services/Desativar';
import './card-perfil.css';

const modalExclusaoConfig = {
  titulo: "Confirmação",
  texto: "Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.",
  botoes: [
    { texto: "Cancelar", tipo: "secundario" },
    { texto: "Excluir Conta", tipo: "primario" }
  ]
};

export default function Card_perfil() {
  const { logout, clearAuth, updateUserImage } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    imagem: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [foto, setFoto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [loadingExclusao, setLoadingExclusao] = useState(false);
  const [erroExclusao, setErroExclusao] = useState('');
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [fotoError, setFotoError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');
  const fileInputRef = useRef(null);

  const [modalValues, setModalValues] = useState({
    emailRecuperacao: '',
    novoEmail: '',
    confirmarEmail: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: ''
  });

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        setLoading(true);
        const dados = await acharUsuario();

        setUsuario({
          nome: dados.nome || 'Nome não informado',
          email: dados.email || 'Email não informado',
          dataNascimento: dados.dataNascimento || 'Data não informada',
          cpf: dados.cpf || 'Não informado',
          imagem: dados.imagem || null
        });

        setFoto(dados.imagem || null);

        setModalValues(prev => ({
          ...prev,
          emailRecuperacao: dados.email || ''
        }));

      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
        setError(err.message || 'Erro ao carregar dados do usuário');
        if (err.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDadosUsuario();
  }, [logout, navigate]);

  const dadosUsuario = [
    { icone: <FaEnvelope className="icone-dado" />, valor: usuario.email, tipo: 'email', mostraBotao: true },
    { icone: <FaLock className="icone-dado" />, valor: '********', tipo: 'senha', mostraBotao: true },
    { icone: <FaCalendar className="icone-dado" />, valor: usuario.dataNascimento ? new Date(usuario.dataNascimento).toLocaleDateString('pt-BR') : 'Data não informada', tipo: 'dataNascimento', mostraBotao: false },
    { icone: <FaUser className="icone-dado" />, valor: usuario.cpf, tipo: 'cpf', mostraBotao: false }
  ];

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setFotoError('Por favor, selecione um arquivo de imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFotoError('A imagem deve ter menos de 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target.result;
      try {
        setUploadingFoto(true);
        setFotoError('');

        const result = await updateUserImage(base64Image);

        if (result.success) {
          setFoto(base64Image);
          setModalSuccess('Imagem atualizada com sucesso!');
          setTimeout(() => setModalSuccess(''), 3000);
        } else {
          setFotoError(result.message || 'Erro ao atualizar imagem');
        }
      } catch (error) {
        console.error('Erro ao atualizar imagem:', error);
        setFotoError('Erro ao atualizar imagem');
      } finally {
        setUploadingFoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (uploadingFoto) return;
    fileInputRef.current.click();
  };

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setModalError('');
    setModalSuccess('');
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setModalError('');
    setModalSuccess('');
    setModalValues(prev => ({ ...prev, novoEmail: '', confirmarEmail: '', senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' }));
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalValues(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async () => {
    try {
      setModalError('');
      setModalSuccess('');

      if (modalTipo === 'email') {
        if (modalValues.novoEmail !== modalValues.confirmarEmail) {
          setModalError('Os emails não coincidem');
          return;
        }
        const result = await alterarEmailUsuario(modalValues.novoEmail, localStorage.getItem('accessToken'));
        if (result.success) {
          setUsuario(prev => ({ ...prev, email: modalValues.novoEmail }));
          setModalSuccess('Email atualizado com sucesso!');
          setTimeout(fecharModal, 2000);
        } else {
          setModalError(result.message || 'Erro ao atualizar email');
        }
      } else if (modalTipo === 'senha') {
        if (!modalValues.senhaAtual) {
          setModalError('Informe sua senha atual');
          return;
        }
        if (modalValues.novaSenha.length < 8) {
          setModalError('A nova senha deve conter no mínimo 8 caracteres');
          return;
        }
        if (modalValues.novaSenha !== modalValues.confirmarNovaSenha) {
          setModalError('As senhas não coincidem');
          return;
        }
        const result = await alterarSenhaUsuario(modalValues.novaSenha, localStorage.getItem('accessToken'));
        if (result.success) {
          setModalSuccess('Senha atualizada com sucesso!');
          setTimeout(fecharModal, 2000);
        } else {
          setModalError(result.message || 'Erro ao atualizar senha');
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setModalError('Erro inesperado ao atualizar');
    }
  };

  const confirmarExclusao = async () => {
    setLoadingExclusao(true);
    setErroExclusao('');
    try {
      const resultado = await DesativarUsuario(localStorage.getItem('accessToken'));

      if (resultado.success) {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        if (clearAuth) clearAuth();
        logout();
        navigate('/', {
          replace: true,
          state: {
            contaDesativada: true,
            mensagem: "Sua conta foi desativada com sucesso."
          }
        });

        window.location.reload();
      } else {
        setErroExclusao(resultado.message || 'Erro ao desativar conta');
      }
    } catch (error) {
      console.error('Erro ao desativar conta:', error);
      setErroExclusao(error.response?.data?.message || 'Erro inesperado ao excluir conta');
    } finally {
      setLoadingExclusao(false);
      setMostrarModalExclusao(false);
    }
  };

  if (loading) return <div className="card-perfil loading">Carregando dados do usuário...</div>;
  if (error) return <div className="card-perfil error">{error}</div>;

  return (
    <div className="card-perfil">
      <div className="foto-container" onClick={triggerFileInput}>
        {foto ? (
          <img src={foto} alt="Foto do usuário" className={`foto-usuario ${uploadingFoto ? 'uploading' : ''}`} />
        ) : (
          <div className="foto-placeholder">
            <FaUser size={48} color="#666" />
            <div className="foto-overlay">
              <FaCamera size={24} color="white" />
            </div>
          </div>
        )}
        {uploadingFoto && <div className="foto-loading">Atualizando...</div>}
        <input type="file" ref={fileInputRef} onChange={handleFotoChange} accept="image/*" style={{ display: 'none' }} />
      </div>

      {fotoError && <div className="error-message">{fotoError}</div>}
      {modalSuccess && <div className="success-message">{modalSuccess}</div>}

      <div className="dados-container">
        <div className="modo-visualizacao">
          <h3 className="nome">{usuario.nome}</h3>
          {dadosUsuario.map((dado, index) => (
            <div key={index} className="dado-item">
              <span className="dado-icon">{dado.icone}</span>
              <span className="dado-valor">{dado.valor}</span>
              {dado.mostraBotao && (
                <button className="botao-alterar-dado" onClick={() => abrirModal(dado.tipo)} aria-label={`Alterar ${dado.tipo}`}>
                  <FaEdit className="icone-editar" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="botoes-acao">
        <button className="botao-excluir" onClick={() => setMostrarModalExclusao(true)} disabled={loadingExclusao}>
          <FaTrash className="icone-excluir" />
          {loadingExclusao ? 'Processando...' : 'Excluir Conta'}
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={fecharModal} aria-label="Fechar modal">×</button>
            <h2 className="modal-title">{modalTipo === 'email' ? 'Alterar Email' : 'Alterar Senha'}</h2>
            <MudarInfo tipo={modalTipo} values={modalValues} onChange={handleModalChange} onSubmit={handleModalSubmit} />
            {modalError && <div className="modal-error">{modalError}</div>}
            {modalSuccess && <div className="modal-success">{modalSuccess}</div>}
          </div>
        </div>
      )}

      {mostrarModalExclusao && (
        <Mensagem 
          titulo={modalExclusaoConfig.titulo} 
          texto={modalExclusaoConfig.texto} 
          botoes={modalExclusaoConfig.botoes} 
          onClose={() => setMostrarModalExclusao(false)} 
          onClick={(botaoTexto) => {
            if (botaoTexto === "Excluir Conta") confirmarExclusao();
          }} 
        />
      )}

      {erroExclusao && <div className="error-message">{erroExclusao}</div>}
    </div>
  );
}
