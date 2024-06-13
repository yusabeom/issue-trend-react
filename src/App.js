import NewsTemplate from './components/board/NewsTemplate';
import Intro from './components/main/Intro';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Join from './components/user/Join';
import './App.css';
import Layout from './common/layout/Layout';
import NewsList from './components/board/NewsList';
import ChatModal from './components/chat/ChatModal';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Intro />} />
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/news' element={<NewsList />} />
          <Route path='/join' element={<Join />} />
          <Route path='/news' element={<NewsTemplate />} />
          <Route path='/chat' element={<ChatModal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
