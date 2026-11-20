export function Filtros() {
    return (
        <nav aria-label="Filtros de status" className="filtros header-box" id="filmes-filtros">
            <button className="header-btn ativo" data-status="todos">Todos</button>
            <button className="header-btn" data-status="assistido">Assistido</button>
            <button className="header-btn" data-status="assistindo">Assistindo</button>
            <button className="header-btn" data-status="quero">Quero assistir</button>
            <button className="header-btn" data-status="drop">Dropado</button>
        </nav> 
    );
}