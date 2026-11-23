import type { Filme } from "./data/model/filme";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

async function requisitar<T>(rota: string, opcoes?: RequestInit): Promise<T> {
    const resposta = await fetch(`${API_URL}${rota}`, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...opcoes?.headers
        }
    });

    if (!resposta.ok) {
        let mensagem = `Erro na requisição (${resposta.status})`;
        try {
            const dados: { erro?: string } = await resposta.json();
            mensagem = dados.erro || mensagem;
        } catch {
            // Mantém a mensagem HTTP quando a resposta não contém JSON.
        }
        throw new Error(mensagem);
    }

    if (resposta.status === 204) {
        return undefined as T;
    }

    return resposta.json() as Promise<T>;
}

export function listar(): Promise<Filme[]> {
    return requisitar<Filme[]>("/filmes");
}

export function criar(filme: Filme): Promise<Filme> {
    return requisitar<Filme>("/filmes", {
        method: "POST",
        body: JSON.stringify({
            titulo: filme.titulo,
            ano: filme.ano,
            genero: filme.genero,
            poster: filme.poster,
            nota: filme.nota,
            status: filme.status,
            comentario: filme.comentario
        })
    });
}

export function atualizar(filme: Filme): Promise<Filme> {
    return requisitar<Filme>(`/filmes/${filme.id}`, {
        method: "PUT",
        body: JSON.stringify(filme)
    });
}

export function remover(id: number): Promise<void> {
    return requisitar<void>(`/filmes/${id}`, {
        method: "DELETE"
    });
}
