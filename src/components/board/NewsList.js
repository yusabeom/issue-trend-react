import React, { useEffect, useReducer } from 'react';
import NewsItem from './NewsItem';

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
        loading: true,
      };

    case 'LOAD_MORE_SUCCESS':
      return {
        ...state,
        loading: false,
        restPage: state.restPage - 5,
        hasMore: state.restPage - 5 > 0,
        components: [
          ...state.components,
          state.newsList
            .slice(
              state.curPage * 5,
              Math.min(state.curPage * 5 + 5, state.newsList.length),
            )
            .map((news) => <NewsItem key={news.id} article={news} />),
        ],
        curPage: state.curPage + 1,
      };

    case 'FETCH':
      return {
        ...state,
        newsList: action.newsList,
        restPage: action.newsList.length - 5,
        hasMore: action.newsList.length - 5 > 0,
        components: action.newsList
          .slice(0, Math.min(5, action.newsList.length))
          .map((news) => <NewsItem key={news.id} article={news} />),
      };
  }
};

const NewsList = ({ newsList }) => {
  const [state, dispatch] = useReducer(reducer, {
    newsList, // 한 페이지의 뉴스 목록
    loading: false, // load more 상태값 관리
    restPage: 0, // 로드할 게시물 개수
    hasMore: true, // 아직 로드할 게시물이 있는지 여부
    components: [], // 렌더링 할 컴포넌트
    curPage: 1, // 현재 페이지
  });

  useEffect(() => {
    // newsList 업데이트
    dispatch({
      type: 'FETCH',
      newsList,
    });
  }, [newsList]);

  const loadMoreOnClick = () => {
    if (state.loading) return;
    dispatch({ type: 'LOAD_MORE' });

    setTimeout(() => {
      dispatch({ type: 'LOAD_MORE_SUCCESS' });
    }, 1000);
  };

  return (
    <>
      <ul className='newsLists'>{state.components}</ul>

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
    </>
  );
};

export default NewsList;
