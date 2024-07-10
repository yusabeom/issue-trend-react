import React, { useEffect, useState } from 'react';
import styles from '../../styles/Graph.module.scss';
import GraphDetail from './GraphDetail';
import { API_BASE_URL, USER } from '../../config/host-config';
const API_BASE_URL2 = API_BASE_URL + USER + '/todayKeywordsFrequency';

const Graph = () => {
  const { graphContainer, title, graph } = styles;

  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_BASE_URL2);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const topTenWords = data
          .sort((a, b) => b.frequency - a.frequency)
          .slice(0, 10); // 상위 10개 항목 추출

        setWords(topTenWords);
        // console.log(topTenWords);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWords();
  }, []);

  return (
    <div className={graphContainer}>
      <div className={title}>
        <h1>오늘의 키워드 그래프</h1>
      </div>
      <div className={graph}>
        <GraphDetail words={words} />
      </div>
    </div>
  );
};

export default Graph;
