import { estrelas, ROTULOS } from "../data/filmes.ts";
import { Filme } from "../data/model/filme.ts";

type CardProps = {
    filme: Filme;
};

export default function CardFilme({ filme }: CardProps) {
    return (
        <article id={`card-filme-${filme.id}`} className="card">
            <img src={filme.poster} alt={`Poster do filme ${filme.titulo}`} />
            <h2>{filme.titulo}</h2>
            <p>{`${filme.ano} · ${filme.genero}`}</p>
            <p>{`Nota: ${estrelas(filme.nota)}`}</p>
            <span className={`badge ${filme.status}`}>{ROTULOS[filme.status]}</span>
            <div className="acoes">
                <button className="btn-editar" type="button">Editar</button>
                <button className="btn-remover" type="button">Remover</button>
            </div>
        </article>
    )
}