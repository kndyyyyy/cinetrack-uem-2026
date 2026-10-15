function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    if (status === "drop") return "Dropado";
    return status;
}

const estrelas = (nota) => {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
};

const filmesIniciais = [
    { id: 1, titulo: "A Origem", ano: 2010,
      genero: "Ação, Ficção científica e Aventura",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
      nota: 5, status: "assistido", comentario: "" },
    { id: 2, titulo: "Parasita", ano: 2019,
      genero: "Comédia, Thriller e Drama",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
      nota: 4, status: "assistido", comentario: "" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000,
      genero: "Comédia, Drama, Fantasia e Romance",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
      nota: 5, status: "assistido", comentario: "" },
    { id: 4, titulo: "Duna: Parte Dois", ano: 2024,
      genero: "Ficção científica e Aventura",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/hH5lhwd8RzvVGbpRixPvIOltZLt.jpg",
      nota: 4, status: "assistindo", comentario: "" },
    { id: 5, titulo: "Interestelar", ano: 2014,
      genero: "Ficção científica, Aventura e Drama",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg",
      nota: 5, status: "quero", comentario: "" },
    { id: 6, titulo: "Cidade de Deus", ano: 2002,
      genero: "Drama, Crime",
      poster: "https://image.tmdb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
      nota: 4, status: "quero", comentario: "" }
];

function renderizarCards(filmes) {
    const cards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster}" alt="Poster ${f.titulo}">
            <h2>${f.titulo}</h2>
            <p>${f.ano} · ${f.genero}</p>
            <p>Nota: ${estrelas(f.nota)}</p>
            <span class="badge ${f.status}">${rotuloStatus(f.status)}</span>
            <div class="acoes">
                <button type="button">Editar</button>
                <button type="button">Remover</button>
            </div>
        </article>`).join("");
    lista.innerHTML = cards;
}

renderizarCards(filmesIniciais);

const TOTAL = 6;
document.querySelector("footer small").textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;