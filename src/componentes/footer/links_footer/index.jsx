import { Link } from "react-router-dom";


export default function Links__f({ link, desc , onClick}) {
    return (
        <Link to={link} onClick={onClick}>{desc}</Link>
    );
};