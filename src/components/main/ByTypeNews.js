import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/ByTypeNews.module.scss';
import RegionSelector from './RegionSelector';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';
import TypeNewsModal from './TypeNewsModal';
import { Modal, Typography, Box } from '@mui/material';
import { API_BASE_URL, USER } from '../../config/host-config';
const API_BASE_URL2 = API_BASE_URL + USER + '/todayArticles';

const ByTypeNews = () => {
  const { itemContainer, hoverText, hoverContainer } = styles;

  const [region, setRegion] = useState('서울');
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState('');
  const [hoverContent, setHoverContent] = useState(null);

  const fetchArticles = useCallback(async (region) => {
    try {
      const response = await fetch(API_BASE_URL2, {
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
  const openModal = (articleCode) => {
    const target = articleCode.toString().padStart(10, '0');

    setCode(target);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleHover = (articleCode) => {
    setHoverContent(articleCode);
  };

  const handleMouseLeave = () => {
    setHoverContent(null);
  };

  return (
    <div>
      <RegionSelector onRegionChange={handleRegionChange} />

      <ul className={itemContainer}>
        {articles.map((news) => (
          <li
            key={news.articleCode}
            value={news.articleCode}
            style={{
              backgroundImage: `url(${news.img})`,
            }}
            onClick={() => openModal(news.articleCode)}
            onMouseEnter={() => handleHover(news.articleCode)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={hoverContainer}>
              {hoverContent === news.articleCode && (
                <span className={hoverText}>{news.shortTitle}</span>
              )}
            </div>
          </li>
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
