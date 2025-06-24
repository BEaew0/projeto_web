export default function Topico({ texto, id, onClick }) {
    return (
        <div className="topicos-ancoragem">
            <ul>
                <li id={id} onClick={onClick}>
                    {texto}
                </li>
            </ul>
        </div>
    );
}