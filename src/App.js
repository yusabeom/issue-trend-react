import NewsList from './components/board/NewsList';
import Intro from './components/main/Intro';
import { Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Join from './components/user/Join';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/newsList' element={<NewsList />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </>
  );
}

export default App;
