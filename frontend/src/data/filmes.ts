export const ROTULOS: { [key: string]: string } = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir",
    drop: "Dropado"
}

export function estrelas(nota: number): string {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
}
