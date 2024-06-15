import React, { useEffect, useReducer, useState } from 'react';
import Filter from './Filter';
import NewsList from './NewsList';
import '../../styles/NewsTemplate.css';
import NewsItem from './NewsItem';
import { Reset } from 'styled-reset';
import Header from '../../common/layout/Header';

import Footer from '../../common/layout/Footer';
import { useSearchParams } from 'react-router-dom';
import handleRequest from '../../utils/handleRequest';
import { API_BASE_URL } from '../../config/host-config';
import axios from 'axios';

const NewsTemplate = () => {
  // API_BASE_URL: 백엔드 hostname
  // NEWS_URL : news 관련 요청
  const NEWS = '/news';
  const NEWS_URL = API_BASE_URL + NEWS;

  const [newsList, setNewsList] = useState([]); // 전체 뉴스 기사 수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [pageNewsList, setPageNewsList] = useState([]); // 현재 페이지의 뉴스 기사
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1; // 현재 페이지
  const size = searchParams.get('size') || 20; // amound (페이지 당 게시물 개수)

  useEffect(async () => {
    /*
    // (필터, 페이지에 따라)서버로부터 뉴스 목록 데이터 가져오기
    // fetch가 정상적으로 이루어지면 loading을 false로
    const res = await axios.get(NEWS_URL, { page, size, tags, keyword });

    console.log('page: ', page);
    const getNewsList = await res.data; // 페이징이 된 데이터
    */

    // 더미 데이터 생성
    const newNewsList = [];
    for (let i = 0; i < 50; i++) {
      newNewsList.push({
        id: i + 1,
        title: `${i + 1}번째 뉴스 타이틀`,
        content: `${i + 1}번째 뉴스 내용입니다. 내용 중간에 짤리는 부분은 서버에서 구현해주...`,
        datetime: `${i * 2 < 60 ? 2 * i + '분' : i + '시간'}전`,
        imgUrl:
          'https://mimgnews.pstatic.net/image/origin/003/2024/06/11/12598694.jpg?type=nf220_150',
      });
    }
    setNewsList(newNewsList);
  }, []);

  useEffect(() => {
    // 전체 페이지 수 = 전체 게시물 수 / 페이지 당 게시물 수
    const totalPageCount = Math.ceil(newsList.length / size);
    setTotalPages(totalPageCount);
    console.log('totalPageCount: ', totalPageCount);

    if (newsList.length > 0) {
      const filteredList = newsList.filter(
        (board) => board.id >= (page - 1) * size + 1 && board.id <= page * size,
      );
      setPageNewsList(filteredList);
    }
  }, [newsList, page, size]);

  const getFilterTags = (tags, keyword) => {
    // console.log('=======================');
    // console.log(tags);
    // console.log(keyword);
    setTags(tags);
    setKeyword(keyword);
  };

  return (
    <>
      <Header />

      <div className='news-wrapper aspect-ratio'>
        <Filter onTags={getFilterTags} />
        <NewsList
          newsList={pageNewsList}
          page={page}
          size={size}
          count={totalPages}
        />
      </div>
    </>
  );
};

export default NewsTemplate;
