import { Link } from "react-router-dom";
import "./logo.css";


export default function LogoTS({ link, logo }) 
{
    return <Link to={link} ><img src={logo} alt=""/></Link>;
}