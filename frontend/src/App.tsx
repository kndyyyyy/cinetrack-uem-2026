import './App.css'
import { useEffect, useState } from 'react';
import { Filtros } from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import Rodape from './components/Rodape';
import Cabecalho from './components/Cabecalho';
import ModalFilme, { ModalFilmeModo } from './components/ModalFilme';
import type { Filme } from './data/model/filme';
import { atualizar as atualizarFilme, criar, listar, remover } from './api';
import Spinner from './components/Spinner';

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalModo, setModalModo] = useState(ModalFilmeModo.OCULTAR);
  const [modalFilme, setModalFilme] = useState<Filme | undefined>(undefined);
  const [filmes, setFilmes] = useState(new Array<Filme>());
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | undefined>(undefined);
  const [erroOperacao, setErroOperacao] = useState<string | undefined>(undefined);

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

  async function salvarFilme(f:Filme) {
    try {
      setErroOperacao(undefined);
      const filmeSalvo = modalModo === ModalFilmeModo.EDITAR
        ? await atualizarFilme(f)
        : await criar(f);
      setFilmes((atuais) => modalModo === ModalFilmeModo.EDITAR
        ? atuais.map((filme) => filme.id === filmeSalvo.id ? filmeSalvo : filme)
        : [...atuais, filmeSalvo]);
      ocultarModal();
    } catch (erro) {
      setErroOperacao(erro instanceof Error ? erro.message : 'Erro ao salvar o filme.');
    }
  }

  async function removerFilme(f:Filme) {
    try {
      setErroOperacao(undefined);
      await remover(f.id);
      setFilmes((atuais) => atuais.filter((filme) => filme.id !== f.id));
    } catch (erro) {
      setErroOperacao(erro instanceof Error ? erro.message : 'Erro ao remover o filme.');
    }
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
      
      {erroOperacao && <p role="alert">{erroOperacao}</p>}
      {montarCorpoPagina()}

      <Rodape />
      <ModalFilme 
          key={`${modalModo}-${modalFilme?.id ?? 'novo'}`}
          modo={modalModo} 
          filme={modalFilme}
          aoSalvar={(f:Filme) => salvarFilme(f)} 
          aoCancelar={() => ocultarModal()} />
    </section>
  );
}

export default App
