import BarraPesquisa from "./BarraPesquisa";

export default function Titulo() {
    return (
        <header className="header-box">
            <h1>CineTrack</h1>
            <p>Sua biblioteca de filmes!</p>
            <BarraPesquisa />
        </header>
    );
}