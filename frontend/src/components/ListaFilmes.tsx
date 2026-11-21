import CardFilme from "./CardFilme";
import type { Filme } from "../data/model/filme";


export default function ListaFilmes({ filmes }: { filmes: Filme[] }) {
    return (
        <section id="lista" aria-live="polite">
            {filmes.length > 0 ? (
                filmes.map((filme) => (
                    <CardFilme key={filme.id} filme={filme} />
                ))
            ) : (
                <h3>Nenhum filme encontrado {`:(`}</h3>
            )}
        </section>
    )
}