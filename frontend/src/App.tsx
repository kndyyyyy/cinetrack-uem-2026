import './App.css'
import { useEffect, useState } from 'react';
import { Filtros } from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import Rodape from './components/Rodape';
import { gerarId } from './data/filmes';
import Cabecalho from './components/Cabecalho';
import ModalFilme, { ModalFilmeModo } from './components/ModalFilme';
import type { Filme } from './data/model/filme';
import { listar } from './api';
import Spinner from './components/Spinner';

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalModo, setModalModo] = useState(ModalFilmeModo.OCULTAR);
  const [modalFilme, setModalFilme] = useState<Filme | undefined>(undefined);
  const [filmes, setFilmes] = useState(new Array<Filme>());
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | undefined>(undefined);

  useEffect(() => {
    listar().then((filmes) => {
      setFilmes(filmes);
      setCarregando(false);
      setErro(undefined);
    }).catch((erro) => {
      setCarregando(false);
      setErro(erro.message);
    });
  }, []);

  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`
  }, [filmes.length])

  function salvarFilme(f:Filme) {
    if (modalModo === ModalFilmeModo.ADICIONAR) f.id = gerarId(filmes);

    let novosFilmes = modalModo === ModalFilmeModo.EDITAR ? 
        filmes.map((filme) => filme.id === f.id ? f : filme) : [...filmes, f];
    setFilmes(novosFilmes);
    ocultarModal();
  }

  function removerFilme(f:Filme) {
    let novosFilmes = filmes.filter((filme) => filme.id !== f.id);
    setFilmes(novosFilmes);
    ocultarModal();
  }
  
  function ocultarModal() {
    setModalModo(ModalFilmeModo.OCULTAR)
    setModalFilme(undefined);
  }

  function corpoPagina() {
    return (
      <article>
        <ListaFilmes filmes={filmes} status={status} busca={busca} 
          setModalFilme={setModalFilme} 
          setModalModo={setModalModo} 
          removerFilme={removerFilme}/>
      </article>
    );
  }

  function carregamento() {
    return(
      <section className="centered-content">
        <Spinner size={50}/>
        <h2>Carregando filmes...</h2>
      </section>
    )
  }

  function mensagemErro() {
    return(
      <section className='centered-content'>
        <h2>⚠️</h2>
        <h2>Erro ao carregar os filmes.</h2>
        <p>{erro}</p>
      </section>
    )
  }

  function montarCorpoPagina() {
    if(carregando) return carregamento();
    if(erro) return mensagemErro();
    return corpoPagina();
  }

  return (
    <section id='main-content'>
      <Cabecalho busca={busca} mudarBusca={setBusca} adicionarFilme={() => { setModalModo(ModalFilmeModo.ADICIONAR); }} />
      <Filtros ativo={status} aoMudar={setStatus} />
      
      {montarCorpoPagina()}

      <Rodape />
      <ModalFilme 
          key={modalModo}
          modo={modalModo} 
          filme={modalFilme}
          aoSalvar={(f:Filme) => salvarFilme(f)} 
          aoCancelar={() => ocultarModal()} />
    </section>
  );
}

export default App
