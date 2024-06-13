import React from 'react';
import styles from '../../styles/Search.module.scss';

const Search = () => {
  const { searchContainer, title, content, contentDetail, number } = styles;

  return (
    <div className={searchContainer}>
      <div className={title}>
        <h1>실시간 검색어</h1>
      </div>

      <ul className={contentDetail}>
        <li>
          <p>1</p> <span>밀양 사건</span>
        </li>
        <li>
          <p>2</p> <span>잠입취재</span>
        </li>
        <li>
          <p>3</p> <span>보건복지부</span>
        </li>
        <li>
          <p>4</p> <span>검찰</span>
        </li>
        <li>
          <p>5</p> <span>소매치기</span>
        </li>
        <li>
          <p>6</p> <span>디지털범죄</span>
        </li>
      </ul>
    </div>
  );
};

export default Search;
