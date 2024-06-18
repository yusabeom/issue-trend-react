import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/ByTypeNews.module.scss';
import RegionSelector from './RegionSelector';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';
import TypeNewsModal from './TypeNewsModal';
import { Modal, Typography, Box } from '@mui/material';

const ByTypeNews = () => {
  const { itemContainer } = styles;

  const API_BASE_URL = 'http://localhost:8181/issue-trend/todayArticles';

  const [region, setRegion] = useState('서울');
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState('');

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
      const filteredData = data.filter(
        (article) => article.img !== '이미지를 찾을 수 없습니다',
      );
      const sliceData = filteredData.slice(0, 9);
      setArticles(sliceData);
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

  // 모달 열고 닫는 핸들러
  const openModal = (e) => {
    const target = e.target.value.toString().padStart(10, '0');

    setCode(target);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <RegionSelector onRegionChange={handleRegionChange} />

      <ul className={itemContainer}>
        {articles.map((news) => (
          <li
            key={news.articleCode}
            value={news.articleCode}
            style={{ backgroundImage: `url(${news.img})` }}
            onClick={openModal}
          ></li>
        ))}
        <TypeNewsModal
          open={open}
          closeModal={closeModal}
          articles={articles}
          code={code}
        />
      </ul>
    </div>
  );
};

export default ByTypeNews;
