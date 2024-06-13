import React from 'react';
import Search from './Search';
import Graph from './Graph';

const SearchAndGraph = () => {
  return (
    <div className='aspect-ratio' style={{ display: 'flex', height: '100vh' }}>
      <Search />
      <Graph />
    </div>
  );
};

export default SearchAndGraph;
