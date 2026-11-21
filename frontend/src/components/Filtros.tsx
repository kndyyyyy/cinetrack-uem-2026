import { ROTULOS } from "../data/filmes";

let STATUS:{ [key: string]: string } = {
    todos: "Todos",
    ...ROTULOS
}

type FiltrosProps = {
    ativo: string,
    aoMudar: React.Dispatch<React.SetStateAction<string>>
}

export function Filtros(props:FiltrosProps) {
    return (
        <nav aria-label="Filtros de status" className="filtros header-box" id="filmes-filtros">
            {Object.keys(STATUS).map((key)=>{
                return (
                    <button key={key} className={`header-btn ${props.ativo == key ? "ativo" : ""}`} data-status={key} onClick={() => props.aoMudar(key)}>
                        {STATUS[key]}
                    </button>
                )
            })}
        </nav> 
    );
}