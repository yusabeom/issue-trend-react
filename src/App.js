import { Reset } from 'styled-reset';
import './App.css';
// import NewsList from './components/board/NewsList';
import Join from './components/user/Join';

function App() {
  return (
    <div className='content-wrapper'>
      <Reset />
      <Join />
    </div>
  );
}

export default App;
