import { Filme } from "./data/model/filme";
import { filmesIniciais } from "./data/filmes";

function esperar(ms: number) {
    return new Promise((ok) => {
        setTimeout(ok, ms);
    })
}

export async function listar(): Promise<Filme[]> {
    await esperar(5000);
    return filmesIniciais;
}