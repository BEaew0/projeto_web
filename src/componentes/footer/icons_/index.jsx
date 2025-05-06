
import  "./icon.css";

export default function Sociais({icon, id})
{
   return(
    <>
    <ul className="lista_icons">
        <li id={id}>{icon}</li>
    </ul>   
    </>
    
    )

}