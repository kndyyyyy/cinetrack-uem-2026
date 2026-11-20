import './App.css'
import { Filtros } from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import Rodape from './components/Rodape';
import Titulo from './components/Titulo'
import { filmesIniciais } from './data/filmes';

function App() {
  return (
    <section>
      <Titulo />
      <Filtros />
      <section>
        <ListaFilmes filmes={filmesIniciais} />
      </section>
      <Rodape />
    </section>
  );
}

export default App
