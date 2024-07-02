import React from 'react';
import Search from './Search';
import Graph from './Graph';

const SearchAndGraph = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        margin: '0 auto',
      }}
    >
      <Search />
      <Graph />
    </div>
  );
};

export default SearchAndGraph;
