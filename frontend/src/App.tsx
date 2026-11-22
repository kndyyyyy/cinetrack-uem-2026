import { useState } from 'react';
import './App.css'
import { Filtros } from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import Rodape from './components/Rodape';
import { filmesIniciais, gerarId } from './data/filmes';
import Cabecalho from './components/Cabecalho';
import ModalFilme, { ModalFilmeModo } from './components/ModalFilme';
import type { Filme } from './data/model/filme';

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalModo, setModalModo] = useState(ModalFilmeModo.OCULTAR);
  const [modalFilme, setModalFilme] = useState<Filme | undefined>(undefined);
  const [filmes, setFilmes] = useState(filmesIniciais);

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

  return (
    <section>
      <Cabecalho busca={busca} mudarBusca={setBusca} adicionarFilme={() => { setModalModo(ModalFilmeModo.ADICIONAR); }} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <section>
        <ListaFilmes filmes={filmes} status={status} busca={busca} 
          setModalFilme={setModalFilme} 
          setModalModo={setModalModo} 
          removerFilme={removerFilme}/>
      </section>
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
