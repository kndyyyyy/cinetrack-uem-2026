export default function BarraPesquisa() {
    return (
        <div className="barra-pesquisa">
            <input type="search" aria-label="Buscar filme"/>
            <button type="button" className="header-btn"><span className="tela-menor">+</span><span className="tela-maior">+ Adicionar filme</span></button>
        </div>
    );  
}