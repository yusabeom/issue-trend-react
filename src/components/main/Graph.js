import React from 'react';
import styles from '../../styles/Graph.module.scss';

const Graph = () => {
  const { graphContainer, title } = styles;
  return (
    <div className={graphContainer}>
      <div className={title}>
        <h1>키워드 검색 그래프</h1>
      </div>
    </div>
  );
};

export default Graph;
