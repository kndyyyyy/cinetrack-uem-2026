export function mediaNotas(lista) {
    let soma = lista.reduce((acc, item) => acc + item.nota, 0);
    return soma / lista.length;
}

export function contagemPorStatus(lista) {
    let contagemPorStatus = lista.reduce((acc, item) => {
        if (item.status === "assistido") {
            acc.assistido++;
        } else if (item.status === "assistindo") {
            acc.assistindo++;
        } else if (item.status === "quero") {
            acc.quero++;
        }
        return acc;
     }, {assistido: 0, assistindo: 0, quero: 0});
    return contagemPorStatus;
}

export function ordenarPorNota(lista) {
    return [...lista].sort((a, b) => b.nota - a.nota);
}