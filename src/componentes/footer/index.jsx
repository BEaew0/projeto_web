import {FaLinkedin,FaGithub} from "react-icons/fa";
import { FaSquareXTwitter, FaBluesky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Links__f from "./links_footer/index";
import Sociais from "../footer/icons_/index";

import "./footer.css";

 

export default function Footer(){
    const icons_midia =
        [
            { 
              icon: <FaLinkedin size={24} />, 
              id:"icon_sociais"
               
            },
            { 
              icon: <FaGithub size={24} />, 
              id:"icon_sociais"
            },
            {
                icon: <FaSquareXTwitter size={24} />,
                id:"icon_sociais"
            },
            {
                icon: <FaBluesky size={24}/>,
                id:"icon_sociais"
                
            }

        ];

 const links_footer=
        [
            {
                link:"/politica_priv",
                nome:"Politica de privacidade"
       
            },
            { 
                link:"/contato",
                nome:"Entre em contato",
                 onClick: () => navigate("/cadastro")
        
            },
            {
                link:"/suporte_ver",
                nome:"Suporte da versão"
            }
            
        ]
    

    const navigate = useNavigate();
    
    return(
    <footer className="footer_main">  

      <div className="menu_footer">

        <div className="links_footer">
            {links_footer.map((link, key) => 
            (<Links__f link={link.link}  onClick={link.onClick}  desc={link.nome} key={key} /> ))}
        </div>

        <ul className="redes_sociais">
            <p>Tesouroazul@gmail.com</p>
            {icons_midia.map((icon, key) => 
            (<Sociais id={icon.id} icon={icon.icon} key={key} />))}
        </ul>

      </div>
                
    </footer>
        
    )
};