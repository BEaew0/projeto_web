// Componente Texto.jsx (versão sem ternário)
export default function Texto({ título, subtítulo, paragrafo, name }) {
  return (
      <div className={`texto-${name}`}>
        
          <h1>{título}</h1>
          
          {subtítulo != false && <h3>{subtítulo}</h3>}
          
          <div className="paragrafos">
              {paragrafo.map((item, index) => 
              (
                  <p key={index}>{item.paragrafo}</p>
              ))
              }
          </div>
      </div>
  );
}