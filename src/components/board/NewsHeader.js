import React from 'react';
import styles from '../../styles/NewsHeader.module.scss';

const NewsHeader = () => {
  const { background, content, btn, 'btn-pulse': btnPulse } = styles;
  return (
    <div className={background}>
      <div className={content}>
        <h2>금일 뉴스 기사</h2>
      </div>
    </div>
  );
};

export default NewsHeader;
