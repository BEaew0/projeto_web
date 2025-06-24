import "./icon.css";

export default function Sociais({ icon, id }) {
   return (
    <li className="social-icon" id={id}>{icon}</li>
   );
}