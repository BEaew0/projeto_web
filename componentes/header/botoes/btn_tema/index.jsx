import "./botoes.css";
import { useTema } from "../../menu_/mudar_tema/mudar_tema";
import { FaSun, FaMoon } from "react-icons/fa";

export default function BtnTema({id,tema_nome}) {
  const { tema, alternarTema } = useTema();


  return (
    <button className={`btn-tema ${tema_nome}`} onClick={alternarTema}>
      <span id={id}>
        {tema === 'light' ? <FaMoon /> : <FaSun />}
      </span>
    </button>
  );
}
