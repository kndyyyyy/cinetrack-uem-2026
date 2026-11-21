import { useState } from 'react';
import './App.css'
import { Filtros } from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import Rodape from './components/Rodape';
import { filmesIniciais } from './data/filmes';
import Cabecalho from './components/Cabecalho';

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  return (
    <section>
      <Cabecalho busca={busca} mudarBusca={setBusca} />
      <Filtros ativo={status} aoMudar={setStatus}/>
      <section>
        <ListaFilmes filmes={filmesIniciais} status={status} busca={busca}/>
      </section>
      <Rodape />
    </section>
  );
}

export default App
