import React from 'react';
import styles from '../../styles/NewsHeader.module.scss';

const NewsHeader = () => {
  const { background, content, btn, 'btn-pulse': btnPulse } = styles;
  return (
    <div className={background}>
      <div className={content}>
        <h2>최신 뉴스 기사</h2>
        <p>이슈트렌드 최신 뉴스기사를 확인 하실 수 있습니다.</p>
      </div>
    </div>
  );
};

export default NewsHeader;
