import React, { useEffect, useState } from 'react';
import styles from '../../styles/Search.module.scss';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import axiosInstance from '../../config/axios-config';

const Search = () => {
  const { searchContainer, title, content, contentDetail, number, date } =
    styles;
  const SEARCH_TERM = '/popular';
  const SEARCH_URL = API_BASE_URL + USER + SEARCH_TERM;

  const [search, setSearch] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(SEARCH_URL);
        const data = response.data;
        setSearch(data);

        const now = new Date();
        const formattedTime = now.toLocaleString('ko-KR', {
          hour: '2-digit',
          month: '2-digit',
          day: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setLastUpdated(formattedTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={searchContainer}>
      <div className={title}>
        <h1>실시간 검색어</h1>
        <div className={date}>
          <p>{lastUpdated} 기준</p>
        </div>
      </div>

      <ul className={contentDetail}>
        {search.map((rank, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <span>{rank}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
