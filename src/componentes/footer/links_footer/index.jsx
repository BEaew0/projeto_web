import { Link } from "react-router-dom";


export default function Links__f({ link, desc }) {
    return (
        <Link to={link}>{desc}</Link>
    );
};