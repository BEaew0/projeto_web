import {FaLinkedin,FaGithub } from "react-icons/fa";

import "./footer.css";



 const icons_Midia =
        [
            { 
              icon: <FaLinkedin size={24} />, 
              name: "LinkedIn" 
            },
            { 
              icon: <FaGithub size={24} />, 
              name: "GitHub" 
            }
          ];
    


    


export default function Footer(){
    return(
        <footer className="FOOTER">  

            <ul className="icons-lista">
                {icons_Midia.map((item, index) => (
                 < li key={index} className="icon-item">
                    <a href="#" aria-label={item.name}>
                        {item.icon}
                    </a>
                 </li>
                ))}
            </ul>
          
        </footer>
        
    )
   

};