import { filmesIniciais } from "./filmes.js";
import {
  mediaNotas,
  contagemPorStatus,
  ordenarPorNota,
} from "./estatisticas.js";

console.log(mediaNotas(filmesIniciais));
console.log(contagemPorStatus(filmesIniciais));
console.log(ordenarPorNota(filmesIniciais));