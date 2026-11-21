import { Filme } from "./model/filme";

export const filmesIniciais = [
    new Filme(1, "A Origem", 2010, "Ação, Ficção científica e Aventura", "https://www.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg", 5, "assistido", ""),
    new Filme(2, "Parasita", 2019, "Comédia, Thriller e Drama", "https://www.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg", 4, "drop", ""),
    new Filme(3, "O Auto da Compadecida", 2000, "Comédia, Drama, Fantasia e Romance", "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg", 5, "assistido", ""),
    new Filme(4, "Duna: Parte Dois", 2024, "Ficção científica e Aventura", "https://www.themoviedb.org/t/p/w600_and_h900_face/hH5lhwd8RzvVGbpRixPvIOltZLt.jpg", 4, "assistindo", ""),
    new Filme(5, "Interestelar", 2014, "Ficção científica, Aventura e Drama", "https://www.themoviedb.org/t/p/w600_and_h900_face/tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg", 5, "quero", ""),
    new Filme(6, "Cidade de Deus", 2002, "Drama, Crime", "https://image.tmdb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg", 4, "quero", "")
];

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