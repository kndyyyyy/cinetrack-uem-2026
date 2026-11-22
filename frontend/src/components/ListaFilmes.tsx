import CardFilme from "./CardFilme";
import type { Filme } from "../data/model/filme";
import { ModalFilmeModo } from "./ModalFilme";

type ListaFilmesProps = {
    filmes: Filme[],
    status: string,
    busca: string,
    setModalFilme: React.Dispatch<React.SetStateAction<Filme | undefined>>,
    setModalModo: React.Dispatch<React.SetStateAction<ModalFilmeModo>>,
    removerFilme: (f:Filme) => void
}

export default function ListaFilmes(props:ListaFilmesProps) {
    const filtrado = (props.status === "todos" ? props.filmes :
        props.filmes.filter((f:Filme) => f.status == props.status))
        .filter((f:Filme) => f.titulo.toLowerCase().includes(props.busca.toLowerCase()));
        
    function removerFilme(f:Filme) {
        if (window.confirm(`Deseja remover o filme "${f.titulo}"?`)) {
            props.removerFilme(f);
        }
    }
    function editarFilme(f:Filme) {
        props.setModalModo(ModalFilmeModo.EDITAR);
        props.setModalFilme(f);
    }

    return (
        <section id="lista" aria-live="polite">
            {filtrado.length > 0 ? (
                filtrado.map((filme) => (
                    <CardFilme key={filme.id} filme={filme} 
                        editarAcao={() => {editarFilme(filme)}}
                        removerAcao={() => {removerFilme(filme)}}
                    />
                ))
            ) : (
                <h3>Nenhum filme encontrado {`:(`}</h3>
            )}
        </section>
    )
}