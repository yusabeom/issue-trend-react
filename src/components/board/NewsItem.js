import React, { useRef } from 'react';
import styles from '../../styles/NewsItem.module.scss';
import NewsDetailModal from './NewsDetailModal';
import basicImage from '../../assets/img/logo2.png';

// 뉴스 목록에서 한 뉴스를 나타내는 컴포넌트
const NewsItem = ({ article }) => {
  const {
    title,
    createdDate,
    img,
    text,
    articleCode,
    truncatedText,
    formattedCreatedDate,
    noimage,
  } = article;
  const { sArticle, sImgContainer, sDatetime, sTitle, sContent } = styles;

  const childButtonRef = useRef(null);
  const openModal = () => {
    console.log('click news article Button!');
    childButtonRef.current.handleOpen();
  };

  return (
    <>
      <li className={sArticle} onClick={openModal}>
        <div className={sImgContainer}>
          {img === '이미지를 찾을 수 없습니다' ? (
            <img className={noimage} src={basicImage} alt='기본 이미지' />
          ) : (
            <img src={img} alt='기사 이미지' />
          )}
        </div>
        <ul>
          <li className={sTitle}>{title}</li>
          <li className={sContent}>{truncatedText}</li>
          <li className={sDatetime}>{formattedCreatedDate}</li>
        </ul>
      </li>
      <div style={{ display: 'none' }}>
        <NewsDetailModal ref={childButtonRef} article={article} />
      </div>
    </>
  );
};

export default NewsItem;
