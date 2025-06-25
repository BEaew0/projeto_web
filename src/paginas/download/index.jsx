import ImgAparelhos from "../../assets/Imagens/aparelhos.png";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import "./download.css";

const texto = [
  {
    p: "Organize seu estoque de qualquer lugar!",
    funcionalidades: [
      { item: "Controle e gerenciamento produtos" },
      { item: "Criação de gráficos" },
      { item: "Previsão de estoque" },
      { item: "Criação de metas" },
    ]
  }
]

export default function Download() {
  // Função para baixar o arquivo APK
  const downloadApk = () => {

    const link = document.createElement('a');
    // Caminho para o arquivo APK na raiz do projeto
    link.href = '/app-debug.apk'; 
    // Nome que será salvo no dispositivo do usuário
    link.download = 'app-estoque.apk'; 
    // Adiciona ao DOM

    document.body.appendChild(link);
    // Dispara o clique

    link.click();
    // Remove do DOM
    document.body.removeChild(link);
  };

  return (
    <div className="container-pag-download">
      <div className="container-imagem">
        <div className="container-cor"></div>
        <img src={ImgAparelhos} alt="Dispositivos móveis" />
      </div>

      {texto.map((item, key) => {
        return (
          <div className="container-texto-desc" key={key}> 
            <p>{item.p}</p>
            <ul>
              {item.funcionalidades.map((func, index) => (
                <li key={index}><IoMdCheckmarkCircle />{func.item}</li> 
              ))}
            </ul>

            <div className="container-opções-dowload">
              <button onClick={downloadApk}> 
                <FaDownload /> Baixe grátis
              </button>
            </div>
          </div>
        )
      })}  
    </div>
  )
}