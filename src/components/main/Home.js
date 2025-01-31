import React from 'react';
import styles from '../../styles/Home.module.scss';
import Header from '../../common/layout/Header';
import Footer from '../../common/layout/Footer';
import WordCloud from './WordCloud';
import CategoryNews from './CategoryNews';
import SearchAndGraph from './SearchAndGraph';
import Title from './Title';

const Home = () => {
  return (
    <>
      <Title />
      <WordCloud />
      <CategoryNews />
      <SearchAndGraph />
    </>
  );
};

export default Home;
