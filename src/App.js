import { Reset } from 'styled-reset';
import './App.css';
import NewsList from './components/board/NewsList';
import Header from './common/layout/Header';
import Footer from './common/layout/Footer';
import Intro from './components/main/Intro';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './components/main/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/newsList' element={<NewsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
