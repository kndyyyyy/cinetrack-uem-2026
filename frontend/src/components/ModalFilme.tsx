import { useState } from "react";
import { ROTULOS } from "../data/filmes"
import { Filme } from "../data/model/filme"

export enum ModalFilmeModo {
    ADICIONAR = "adicionar",
    EDITAR = "editar",
    OCULTAR = "ocultar"
}

type ModalFilmeProps = {
    modo: ModalFilmeModo,
    aoSalvar: (filme: Filme) => void,
    aoCancelar: () => void,
    filme?: Filme
}

type FilmeFormulario = Omit<Filme, "ano" | "nota"> & {
    ano: string,
    nota: string
}

export default function ModalFilme(props: ModalFilmeProps) {
    const [formulario, setFormulario] = useState<FilmeFormulario>(() => ({
        id: props.filme?.id ?? 0,
        titulo: props.filme?.titulo ?? "",
        ano: String(props.filme?.ano ?? 2000),
        genero: props.filme?.genero ?? "",
        poster: props.filme?.poster ?? "",
        nota: String(props.filme?.nota ?? 1),
        status: props.filme?.status ?? "quero",
        comentario: props.filme?.comentario ?? ""
    }));
    
    function atualizar(campo: keyof FilmeFormulario, valor: string) {
        setFormulario((atual) => ({
            ...atual,
            [campo]: valor
        }));
    }

    function submeter(event:React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        props.aoSalvar(new Filme(
            formulario.id,
            formulario.titulo,
            Number(formulario.ano),
            formulario.genero,
            formulario.poster,
            Number(formulario.nota),
            formulario.status,
            formulario.comentario
        ));
    }

    return(
        <div id="modal" hidden={props.modo === ModalFilmeModo.OCULTAR}>
            <div className="modal-conteudo">
                <h2>{props.modo === ModalFilmeModo.EDITAR ? "Editar filme" : "Adicionar filme"}</h2>
                <form id="form-filme" onSubmit={(e) => submeter(e)}>
                    <div className="campo">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" id="titulo" name="titulo" value={formulario.titulo} required 
                               onChange={(e) => {atualizar("titulo", e.currentTarget.value)}}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="ano">Ano</label>
                        <input type="number" id="ano" name="ano" value={formulario.ano} min="1888" max="2030" step="1" required
                               onChange={(e) => {atualizar("ano", e.currentTarget.value)}}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="genero">Gênero</label>
                        <input type="text" id="genero" name="genero" value={formulario.genero} required
                               onChange={(e) => {atualizar("genero", e.currentTarget.value)}}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="poster">URL do poster</label>
                        <input type="text" id="poster" name="poster" value={formulario.poster}
                               onChange={(e) => {atualizar("poster", e.currentTarget.value)}}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={formulario.status} required 
                                onChange={(e) => {atualizar("status", e.currentTarget.value)}}>
                            {Object.keys(ROTULOS).map((key) => {
                                return (
                                    <option key={key} value={key}>{ROTULOS[key]}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="nota">Nota (1 a 5)</label>
                        <select id="nota" name="nota" value={formulario.nota} onChange={(e) => {atualizar("nota", e.currentTarget.value)}}>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="comentario">Comentario</label>
                        <textarea id="comentario" name="comentario" rows={5} cols={40} value={formulario.comentario}
                        onChange={(e) => {atualizar("comentario", e.currentTarget.value)}}></textarea>
                    </div>

                    <div className="form-acoes">
                        <button type="button" className="btn-cancelar" onClick={() => props.aoCancelar()}>Cancelar</button>
                        <button type="submit" className="btn-salvar">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}