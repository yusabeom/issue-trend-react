import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/ByTypeNews.module.scss';
import RegionSelector from './RegionSelector';
import { useNavigate } from 'react-router-dom';

const ByTypeNews = () => {
  const { itemContainer } = styles;

  const API_BASE_URL = 'http://localhost:8181/issue-trend/todayArticles';

  const [region, setRegion] = useState('서울');
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  const goArticle = (news) => {
    navigate(`/news?code=${news}`);
  };

  const fetchArticles = useCallback(async (region) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region }),
      });
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, []);

  useEffect(() => {
    if (region) {
      fetchArticles(region);
    }
  }, [region, fetchArticles]);

  // 지역이 변경될 때 상태를 업데이트하고 기사를 가져옴
  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
    fetchArticles(newRegion);
  };

  return (
    <div>
      <RegionSelector onRegionChange={handleRegionChange} />

      <ul className={itemContainer}>
        {articles.map((news) => (
          <li
            key={news.articleCode}
            style={{ backgroundImage: `url(${news.img})` }}
            // onClick={goArticle(news.articleCode)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default ByTypeNews;
