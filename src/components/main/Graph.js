import React from 'react';
import styles from '../../styles/Graph.module.scss';
import GraphDetail from './GraphDetail';

const Graph = () => {
  const { graphContainer, title, graph } = styles;
  return (
    <div className={graphContainer}>
      <div className={title}>
        <h1>키워드 검색 그래프</h1>
      </div>
      <div className={graph}>
        <GraphDetail />
      </div>
    </div>
  );
};

export default Graph;
