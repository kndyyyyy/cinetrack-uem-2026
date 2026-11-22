import BarraPesquisa from "./BarraPesquisa";

type CabecalhoProps = {
    busca: string,
    mudarBusca: React.Dispatch<React.SetStateAction<string>>,
    adicionarFilme: () => void
}
export default function Cabecalho(props:CabecalhoProps) {
    return (
        <header className="header-box">
            <h1>CineTrack</h1>
            <p>Sua biblioteca de filmes!</p>
            <BarraPesquisa busca={props.busca} mudarBusca={props.mudarBusca} adicionarFilme={props.adicionarFilme}/>
        </header>
    );
}