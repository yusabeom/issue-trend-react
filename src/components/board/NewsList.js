import React, { useEffect, useReducer } from 'react';
import NewsItem from './NewsItem';

import { Button, Pagination } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CircleButton from '../../common/ui/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/NewsList.module.scss';
import Paging from '../../common/ui/Paging';

// 전국 실시간 뉴스 목록 컴포넌트

/*
newsList : 현재 페이지의 뉴스 기사
*/
// 한 페이지 당 기사 개수
const ONEPAGE_ARTICLE_NO = 9;

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
        restPage: state.restPage - ONEPAGE_ARTICLE_NO,
        hasMore: state.restPage - ONEPAGE_ARTICLE_NO > 0,
        components: [
          ...state.components,
          state.newsList
            .slice(
              state.curPage * ONEPAGE_ARTICLE_NO,
              Math.min(
                state.curPage * ONEPAGE_ARTICLE_NO + ONEPAGE_ARTICLE_NO,
                state.newsList.length || 0,
              ),
            )
            .map((news) => <NewsItem key={news.id} article={news} />),
        ],
        curPage: state.curPage + 1,
      };

    case 'FETCH':
      return {
        ...state,
        newsList: action.newsList,
        restPage: action.newsList.length || 0 - ONEPAGE_ARTICLE_NO,
        hasMore: action.newsList.length || 0 - ONEPAGE_ARTICLE_NO > 0,
        components: action.newsList
          .slice(0, Math.min(ONEPAGE_ARTICLE_NO, action.newsList.length || 0))
          .map((news) => (
            <NewsItem
              className={styles.oneArticle}
              key={news.articleCode}
              article={news}
            />
          )),
      };
  }
};

const NewsList = ({ newsList, page, size, count }) => {
  const [state, dispatch] = useReducer(reducer, {
    newsList, // 한 페이지의 뉴스 목록
    loading: false, // load more 상태값 관리
    restPage: 0, // 로드할 게시물 개수
    hasMore: true, // 아직 로드할 게시물이 있는지 여부
    components: [], // 렌더링 할 컴포넌트
    curPage: 1, // 현재 페이지 (소페이지, 1~4)
  });

  useEffect(() => {
    // console.log('In NewsList, newsList: ', newsList);
    // newsList 업데이트
    dispatch({
      type: 'FETCH',
      newsList,
    });
  }, [newsList]);

  // 기사 더보기 클릭 이벤트 핸들러
  const loadMoreOnClick = () => {
    if (state.loading) return;
    dispatch({ type: 'LOAD_MORE' });

    setTimeout(() => {
      dispatch({ type: 'LOAD_MORE_SUCCESS' });
    }, 1000);
  };

  // 맨 위로 버튼 클릭 이벤트 핸들러
  const ScrollToTopHandler = () => {
    console.log('스크롤바!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.newsListWrapper}>
      <ul className={styles.sNewsList}>{state.components}</ul>

      <div className={styles.loadBtn}>
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

      {/* {state.curPage > 1 && (
        <div className={styles.scrollToTop}>
          <CircleButton
            text={<FontAwesomeIcon icon={faChevronUp} />}
            onClickEvent={ScrollToTopHandler}
          ></CircleButton>
        </div>
      )} */}

      {!state.hasMore && (
        <Paging size={size} count={count} curPage={page} type={'news'} />
      )}
    </div>
  );
};

export default NewsList;

const scrollToTop = {};
