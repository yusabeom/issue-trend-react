import React from 'react';
import NewsItem from './NewsItem';
import Filter from './Filter';

// 전국 실시간 뉴스 목록 컴포넌트
const NewsList = () => {
  // 더미데이터
  const news1 = {
    title: "'2025 英QS 세계 대학순위' 서울대 31위·카이스트 53위",
    datetime: '11분전',
    imgUrl:
      'https://mimgnews.pstatic.net/image/origin/003/2024/06/11/12598694.jpg?type=nf220_150',
  };

  const news2 = {
    title: "'감 따다 추락사'…수확 지시한 서울시 관계자 1심 유죄",
    datetime: '24분전',
    imgUrl:
      'https://mimgnews.pstatic.net/image/origin/029/2024/06/10/2879184.jpg?type=nf220_150',
  };

  const news3 = {
    title: '쓰레기 분리수거장에 신생아 버린 30대母…봉지 입구',
    datetime: '25분전',
    imgUrl:
      'https://mimgnews.pstatic.net/image/origin/119/2024/06/11/2838324.jpg?type=nf220_150',
  };

  const news4 = {
    title: '여자 문제로 다투던 자신 말리는 친구에 야구방망...',
    datetime: '51분전',
    imgUrl:
      'https://mimgnews.pstatic.net/image/origin/018/2024/06/11/5761305.jpg?type=nf220_150',
  };

  return (
    <>
      <div className='filterWrapper'>
        <Filter />
      </div>

      <ul className='newsLists'>
        <NewsItem article={news1} />
        <NewsItem article={news2} />
        <NewsItem article={news3} />
        <NewsItem article={news4} />
      </ul>
    </>
  );
};

export default NewsList;
