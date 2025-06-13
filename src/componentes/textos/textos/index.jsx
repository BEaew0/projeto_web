export default function Texto({ título, name, conteudo,button,onClick }) {
  return (
    <div className={`texto-${name}`}>
      <h1 className="titulo-secao">{título}</h1>
      
      <div className="conteudo-texto">
        {conteudo.map((item, index) => (
          <div key={index} className="bloco-texto">
     
            {item.subtitulo && <h2 className="subtitulo">{item.subtitulo}</h2>}

            {item.paragrafo && <p className="paragrafo">{item.paragrafo}</p>}

            {button && (<button className="btn_download" onClick={onClick}>Fazer download </button>)}
          </div>
        ))}
      </div>
    </div>
  );
}