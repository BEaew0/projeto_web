import { Link } from "react-router-dom";
import "./links.css";

export default function Menu_links({ link, text})
{
    return  <Link to={link} id="itens_h"><li>{text}</li></Link>;
}