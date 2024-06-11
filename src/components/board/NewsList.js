import React, { useEffect, useReducer, useState } from 'react';
import NewsItem from './NewsItem';
import Filter from './Filter';
import '../../styles/NewsList.css';
import { Button, Pagination } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// 전국 실시간 뉴스 목록 컴포넌트

/*
Pagination
한 페이지당 20개의 페이지를 로드, 10개 페이지씩 페이징



*/
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_MORE':
      return {
        ...state,
        loading: false,
        restPage: state.restPage - 5,
        hasMore: state.restPage - 5 > 0,
      };

    case 'FETCH':
      return {
        ...state,
        newsList: action.newsList,
        restPage: action.newsList.length - 5,
        hasMore: action.newsList.length - 5 > 0,
      };

    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [
          ...state.components,
          state.newsList
            .slice(
              state.curPage * 5,
              Math.min(state.curPage * 5 + 5, state.newsList.length),
            )
            .map((news) => <NewsItem article={news} />),
        ],
        curPage: state.curPage + 1,
      };
  }
};

const NewsList = () => {
  const [state, dispatch] = useReducer(reducer, {
    newsList: [], // 한 페이지의 뉴스 목록
    loading: false, // load more 상태값 관리
    restPage: 0, // 로드할 게시물 개수
    hasMore: true, // 아직 로드할 게시물이 있는지 여부
    components: [], // 렌더링 할 컴포넌트
    curPage: 1, // 현재 페이지
  });

  /*
  // 뉴스 목록 상태 변수
  const [newsList, setnewsList] = useState([]);

  // loadmore 로딩 상태값 관리
  const [loading, setLoading] = useState(false);

  // 아직 로드할 게시물이 있는지 여부
  const [hasMore, setHasMore] = useState(true);

  // 남은 게시물 개수
  const [restPage, setRestPage] = useState(0);
  */

  useEffect(() => {
    // 서버로부터 뉴스 목록 데이터 가져오기
    // (title, datetime, imgUrl)

    // setHasMore(res.length > 0);
    // setRestPage(20); or setRestPage();

    // newsList 업데이트
    dispatch({
      type: 'FETCH',
      newsList: [news1, news2, news3, news4, news1, news2, news3, news4],
    });
  }, []);

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

  const loadMoreOnClick = () => {
    // setRestPage(restPage - 5);
    // setHasMore(restPage > 0);
    // if (loading) return;

    dispatch({ type: 'LOAD_MORE' });
    dispatch({ type: 'ADD_COMPONENT' });
    console.log(state);
  };

  // 처음 5개만 로드하기

  // 처음 10개만 로드하기
  const secondFive = () => {
    state.newsList
      .slice(5, Math.min(10, state.newsList.length))
      .map((news) => <NewsItem article={news} />);
  };

  // 처음 15개만 로드하기
  const thirdFive = () => {
    state.newsList
      .slice(10, Math.min(15, state.newsList.length))
      .map((news) => <NewsItem article={news} />);
  };

  // 20개 모두 로드하기 (만약 20개보다 더 적을 경우 그 전에 모두 로드)
  const fourthFive = () => {
    state.newsList
      .slice(15, Math.min(20, state.newsList.length))
      .map((news) => <NewsItem article={news} />);
  };

  return (
    <div className='news-wrapper'>
      <div className='filterWrapper'>
        <Filter />
      </div>

      <ul className='newsLists'>
        {state.newsList
          .slice(0, Math.min(5, state.newsList.length))
          .map((news) => (
            <NewsItem article={news} />
          ))}
        {state.components}
      </ul>

      <div className='btn'>
        {state.hasMore &&
          (state.loading ? (
            <LoadingButton loading variant='outlined' size='large'>
              기사 더보기
            </LoadingButton>
          ) : (
            <Button variant='outlined' size='large' onClick={loadMoreOnClick}>
              기사 더보기
            </Button>
          ))}
      </div>
      {!state.hasMore && <Pagination count={10} color='secondary' />}
    </div>
  );
};

export default NewsList;
