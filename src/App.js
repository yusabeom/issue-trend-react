import './App.css';
import NewsList from './components/board/NewsList';
import Intro from './components/main/Intro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Join from './components/user/Join';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/newsList' element={<NewsList />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
