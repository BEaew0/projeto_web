export default function Subtopico({ texto, id, onClick }) {
    return <li id={id} onClick={onClick}>{texto}</li>;
}