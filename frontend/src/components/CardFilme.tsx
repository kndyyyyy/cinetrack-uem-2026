import { estrelas, ROTULOS } from "../data/filmes.ts";
import { Filme } from "../data/model/filme.ts";

type CardProps = {
    filme: Filme;
    editarAcao?: (filme: Filme) => void;
    removerAcao?: (filme: Filme) => void;
};

export default function CardFilme(props: CardProps) {
    return (
        <article id={`card-filme-${props.filme.id}`} className="card">
            <img src={props.filme.poster} alt={`Poster do filme ${props.filme.titulo}`} />
            <h2>{props.filme.titulo}</h2>
            <p>{`${props.filme.ano} · ${props.filme.genero}`}</p>
            <p>{`Nota: ${estrelas(props.filme.nota)}`}</p>
            <span className={`badge ${props.filme.status}`}>{ROTULOS[props.filme.status]}</span>
            <div className="acoes">
                <button className="btn-editar" type="button" onClick={() => {props.editarAcao?.(props.filme)}}>Editar</button>
                <button className="btn-remover" type="button" onClick={() => {props.removerAcao?.(props.filme)}}>Remover</button>
            </div>
        </article>
    )
}