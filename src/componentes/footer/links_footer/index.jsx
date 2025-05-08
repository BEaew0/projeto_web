import { Link } from "react-router-dom";
import "./links_f.css";

export default function Links__f({ link, desc }) {
    return (
        <Link to={link}>{desc}</Link>
    );
};