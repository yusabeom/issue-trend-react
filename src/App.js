import './App.css';

import NewsTemplate from './components/board/NewsTemplate';
import Intro from './components/main/Intro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Join from './components/user/Join';
import { Reset } from 'styled-reset';

function App() {
  return (
    <BrowserRouter>
      <Reset />
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/newsList' element={<NewsTemplate />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
