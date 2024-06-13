import React from 'react';
import styles from '../../styles/NewsItem.module.scss';

// 뉴스 목록에서 한 뉴스를 나타내는 컴포넌트
const NewsItem = ({ article }) => {
  const { title, datetime, imgUrl } = article;
  const { sArticle, sImgContainer, sDatetime, sTitle } = styles;

  return (
    <li className={sArticle}>
      <div className={sImgContainer}>
        <img src={imgUrl} alt='기사 이미지' />
      </div>
      <ul>
        <li className={sTitle}>{title}</li>
        <li className={sDatetime}>{datetime}</li>
      </ul>
    </li>
  );
};

export default NewsItem;
