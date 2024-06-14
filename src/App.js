import NewsTemplate from './components/board/NewsTemplate';
import Intro from './components/main/Intro';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Join from './components/user/Join';
import './App.css';
import Layout from './common/layout/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/news' element={<NewsTemplate />} />
          <Route path='/news/:id' element={<NewsTemplate />} />
          <Route path='/join' element={<Join />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
