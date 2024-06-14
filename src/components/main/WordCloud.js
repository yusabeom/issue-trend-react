import React from 'react';
import styles from '../../styles/WordCloud.module.scss';
import Words from './Words';

const WordCloud = () => {
  const {
    wordCloudContainer,
    titleContainer,
    mainTitle,
    subheading,
    cloudContainer,
    time,
    boxContainer,
  } = styles;
  return (
    <>
      <div className={wordCloudContainer}>
        <div className={titleContainer}>
          <div className={mainTitle}>TODAY</div>
          <div className={subheading}>오늘의 사회뉴스 키워드</div>
        </div>
        <div className={boxContainer}>
          <div className={time}>2024년 06월 11일 18시 기준</div>
          <div className={cloudContainer}>
            <Words />
          </div>
        </div>
      </div>
    </>
  );
};

export default WordCloud;
