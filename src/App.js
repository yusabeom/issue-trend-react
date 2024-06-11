import { Reset } from 'styled-reset';
import './App.css';
import NewsList from './components/board/NewsList';

function App() {
  return (
    <div className='content-wrapper'>
      <Reset />
      <NewsList />
    </div>
  );
}

export default App;
