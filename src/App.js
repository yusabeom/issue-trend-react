import { Reset } from 'styled-reset';
import './App.css';
import NewsTemplate from './components/board/NewsTemplate';

function App() {
  return (
    <div className='content-wrapper'>
      <Reset />
      <NewsTemplate />
    </div>
  );
}

export default App;
