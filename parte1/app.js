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

const TOTAL = 6;
document.querySelector("footer small").textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;

const filmesIniciais = [
    { id: 1, titulo: "A Origem", ano: 2010,
      genero: "Ação, Ficção científica e Aventura",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
      nota: 5, status: "assistido", comentario: "" },
    { id: 2, titulo: "Parasita", ano: 2019,
      genero: "Comédia, Thriller e Drama",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
      nota: 4, status: "drop", comentario: "" },
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

const lista = document.querySelector("#lista");

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster;
    img.alt = `Poster ${f.titulo}`;

    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;

    const meta = document.createElement("p");
    meta.textContent = `${f.ano} · ${f.genero}`;

    const nota = document.createElement("p");
    nota.textContent = `Nota: ${estrelas(f.nota)}`;

    const badge = document.createElement("span");
    badge.className = `badge ${f.status}`;
    badge.textContent = rotuloStatus(f.status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    acoes.append(btnEditar, btnRemover);
    card.append(img, titulo, meta, nota, badge, acoes);
    return card;
}

function renderizarCards(filmes) {
    const frag = document.createDocumentFragment();
    filmes.forEach((f) =>
        frag.appendChild(criarCard(f)));
    lista.replaceChildren(frag);
}

let termoAtual = "";
let statusAtual = "todos";

function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.toLowerCase();
    return lista
        .filter((f) =>
            f.titulo.toLowerCase().includes(termo))
        .filter((f) => opcoes.status === "todos"
            || f.status === opcoes.status);
}

function atualizar() {
    const visiveis = aplicarFiltros(filmes,
        { termo: termoAtual, status: statusAtual });
    renderizarCards(visiveis);
}

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

const busca =
    document.querySelector("header input");

const aoDigitar = (e) => {
    termoAtual = e.target.value;
    atualizar();
};

busca.addEventListener("input",
    debounce(aoDigitar, 300));

const CHAVE = "cinetrack:filmes";
const salvar = () =>
    localStorage.setItem(CHAVE,
        JSON.stringify(filmes));
function carregar() {
    const txt = localStorage.getItem(CHAVE);
    return txt
        ? JSON.parse(txt)
        : [...filmesIniciais];
}

let filmes = carregar();
atualizar();

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover");
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;
    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);
    salvar();
    atualizar();
});

const nav = document.querySelector("#filmes-filtros");

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    statusAtual = botao.dataset.status;
    atualizar();
});

let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

document.querySelector("header button")
    .addEventListener("click", () => {
        editandoId = null;
        form.reset();
        abrir();
    });

document.querySelector(".btn-cancelar")
    .addEventListener("click", fechar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo)
        erros.push("Título obrigatório");
    if (filme.ano < 1888 || filme.ano > 2030)
        erros.push("Ano inválido");
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) =>
    Math.max(0, ...lista.map((f) => f.id)) + 1;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados =
        Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        alert(erros.join("\n"));
        return;
    }

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId
                ? { ...f, ...dados } : f);
    } else {
        filmes = [...filmes,
            { id: gerarId(filmes), ...dados }];
    }
    salvar();
    atualizar();
    fechar();
});

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-editar");
    if (!botao) return;
    const card = botao.closest(".card");
    editandoId = Number(card.dataset.id);
    const f = filmes.find(
        (x) => x.id === editandoId);
    form.elements.titulo.value = f.titulo;
    form.elements.ano.value = f.ano;
    form.elements.genero.value = f.genero;
    form.elements.poster.value = f.poster;
    form.elements.status.value = f.status;
    form.elements.nota.value = f.nota;
    form.elements.comentario.value = f.comentario;
    abrir();
});