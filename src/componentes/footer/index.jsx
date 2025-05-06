import {FaLinkedin,FaGithub,FaSquareXTwitter } from "react-icons/fa";
import Sociais from "../footer/icons_/index";

import "./footer.css";

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
            }
        ];
    


    


export default function Footer(){
    return(
        <footer className="footer">  


           {icons_midia.map((icon, key) => (
            <Sociais id={icon.id} icon={icon.icon} key={key} />
           ))}
          
        </footer>
        
    )
   

};