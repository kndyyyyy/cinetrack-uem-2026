import { debounce } from "../data/util";

type BarraPesquisaProps = {
    busca: string,
    mudarBusca: React.Dispatch<React.SetStateAction<string>>
}

export default function BarraPesquisa(props:BarraPesquisaProps) {
    let debouncedMudarBusca = debounce(props.mudarBusca, 300);

    return (
        <div className="barra-pesquisa">
            <input type="search" aria-label="Buscar filme" onChange={(e) => { debouncedMudarBusca(e.target.value); }}/>
            <button type="button" className="header-btn"><span className="tela-menor">+</span><span className="tela-maior">+ Adicionar filme</span></button>
        </div>
    );  
}