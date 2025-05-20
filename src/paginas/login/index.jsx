import Login_form from "../../componentes/forms/login";
import "./login.css";
export default function Login(){
    return(
      
        <form >
            <Login_form className/>
            <button type="submit" className="btn_logar" name="logar">Logar</button>
        </form>
        
          
      
        
        
    );

}