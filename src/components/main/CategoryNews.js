import React from 'react';
import styles from '../../styles/Category.module.scss';
import ByTypeNews from './ByTypeNews';
import { useNavigate } from 'react-router-dom';

const CategoryNews = () => {
  const { newsContainer, newsTitle, moreButton } = styles;
  const navigate = useNavigate();

  const goNewsList = () => {
    navigate('/news');
  };

  return (
    <div className='aspect-ratio'>
      <div className={newsContainer}>
        <div className={newsTitle}>
          <h1>NEWS</h1>
          <h3>
            지역별 새로운 소식을 <br /> 알려드립니다.
          </h3>
          <div className={moreButton} onClick={goNewsList}>
            더보기&nbsp;&nbsp;⟶
          </div>
        </div>
        <ByTypeNews />
      </div>
    </div>
  );
};

export default CategoryNews;
