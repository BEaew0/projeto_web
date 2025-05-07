

import "./botoes.css";
export default function Btn_tema({ icon, classe, id,onClick }) {
  return (
    <button  className={`btn-tema ${classe}`} onClick={onClick}>
     <li id={id}>{icon}</li>
    </button>
  );
}