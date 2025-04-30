import { Link } from "react-router-dom";

import Logo from "../../../assets/Imagens/logo_tcc1.png";





export default function Links() {
    //para chamar os links
  return (
    <div className="links_lap">
 
        <Link to="/"><img  className="icon_header" src={Logo}></img></Link>
        <Link to="/download">Download</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/devs">Desenvolvedores</Link>

        
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
 
        
    </div> 
 
  );


  

}
