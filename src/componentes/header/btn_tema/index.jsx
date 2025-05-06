

import "./botoes.css";
export default function Btn_tema({ icon, classe, onClick }) {
  return (
    <button  className={`btn-tema ${classe}`} onClick={onClick}>
      <img src={icon} />
    </button>
  );
}