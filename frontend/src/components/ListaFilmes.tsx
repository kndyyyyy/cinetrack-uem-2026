import CardFilme from "./CardFilme";
import type { Filme } from "../data/model/filme";

type ListaFilmesProps = {
    filmes: Filme[],
    status: string,
    busca: string
}

export default function ListaFilmes(props:ListaFilmesProps) {
    const filtrado = (props.status === "todos" ? props.filmes :
        props.filmes.filter((f:Filme) => f.status == props.status))
        .filter((f:Filme) => f.titulo.toLowerCase().includes(props.busca.toLowerCase()));

    return (
        <section id="lista" aria-live="polite">
            {filtrado.length > 0 ? (
                filtrado.map((filme) => (
                    <CardFilme key={filme.id} filme={filme} />
                ))
            ) : (
                <h3>Nenhum filme encontrado {`:(`}</h3>
            )}
        </section>
    )
}