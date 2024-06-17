import React, { useEffect, useState } from 'react';
import styles from '../../styles/WordCloud.module.scss';
import Words from './Words';
import { useNavigate } from 'react-router-dom';

const WordCloud = () => {
  const redirection = useNavigate();
  const {
    wordCloudContainer,
    titleContainer,
    mainTitle,
    subheading,
    cloudContainer,
    time,
    boxContainer,
  } = styles;

  const API_BASE_URL =
    'http://localhost:8181/issue-trend/todayKeywordsFrequency';

  const [words, setWords] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLoading(false);
        const transformedData = data.map((element) => [
          element.keyword,
          element.frequency * 10,
        ]);
        setWords(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return (
    <>
      <div className={wordCloudContainer}>
        <div className={titleContainer}>
          <div className={mainTitle}>TODAY</div>
          <div className={subheading}>오늘의 사회뉴스 키워드</div>
        </div>
        <div className={boxContainer}>
          <div className={time}>2024년 06월 11일 18시 기준</div>
          {loading ? (
            <div className={cloudContainer}>Loading...</div>
          ) : (
            <div className={cloudContainer}>
              <Words words={words} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WordCloud;
