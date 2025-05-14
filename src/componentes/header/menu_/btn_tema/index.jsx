import "./botoes.css";
import { useTema } from "../../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function BtnTema(icon,tema,id) {
  const { tema, alternarTema } = useTema();


  return (
    <button className={`btn-tema ${tema}`} onClick={alternarTema}>
      <span id={id}>
        {tema === 'light' ? <FaMoon /> : <FaSun />}
      </span>
    </button>
  );
}
icon, classe, id, onClick 