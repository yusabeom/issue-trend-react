import React, { useRef } from 'react';
import styles from '../../styles/NewsItem.module.scss';
import NewsDetailModal from './NewsDetailModal';

// 뉴스 목록에서 한 뉴스를 나타내는 컴포넌트
const NewsItem = ({ article }) => {
  const { title, createdDate, img, text, articleCode, truncatedText } = article;
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
          <img src={img} alt='기사 이미지' />
        </div>
        <ul>
          <li className={sTitle}>{title}</li>
          <li className={sDatetime}>{createdDate}</li>
          <li className={sContent}>{truncatedText}</li>
        </ul>
      </li>
      <div style={{ display: 'none' }}>
        <NewsDetailModal ref={childButtonRef} article={article} />
      </div>
    </>
  );
};

export default NewsItem;
