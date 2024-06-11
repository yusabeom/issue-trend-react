import React from 'react';
import styles from '../../styles/Home.module.scss';
import Header from '../../common/layout/Header';
import Footer from '../../common/layout/Footer';
import WordCloud from './WordCloud';

const Home = () => {
  const { home } = styles;

  return (
    <>
      <Header />
      <WordCloud />
      <Footer />
    </>
  );
};

export default Home;
