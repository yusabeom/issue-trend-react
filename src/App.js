import { Reset } from 'styled-reset';
import './App.css';
import Filter from './components/board/Filter';

function App() {
  return (
    <div className='content-wrapper'>
      <Reset />
      <Filter />
    </div>
  );
}

export default App;
