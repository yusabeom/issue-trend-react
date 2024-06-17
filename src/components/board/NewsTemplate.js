import React, { useEffect, useReducer, useState } from 'react';
import Filter from './Filter';
import NewsList from './NewsList';
import '../../styles/NewsTemplate.css';
import NewsItem from './NewsItem';
import { Reset } from 'styled-reset';
import Header from '../../common/layout/Header';

import Footer from '../../common/layout/Footer';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/host-config';
import axios from 'axios';

const NewsTemplate = () => {
  // API_BASE_URL: 백엔드 hostname
  // NEWS_URL : news 관련 요청
  const NEWS = '/issue-trend/todayArticles';
  const SEARCH = '/issue-trend/search';
  const NEWS_URL = API_BASE_URL + NEWS;

  const [newsList, setNewsList] = useState([]); // 전체 뉴스 기사 수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [pageNewsList, setPageNewsList] = useState([]); // 현재 페이지의 뉴스 기사
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1; // 현재 페이지
  const size = searchParams.get('size') || 20; // amound (페이지 당 게시물 개수)

  useEffect(() => {
    // (필터, 페이지에 따라)서버로부터 뉴스 목록 데이터 가져오기
    // fetch가 정상적으로 이루어지면 loading을 false로
    // 2nd parameter : { page, size, tags, keyword }
    // console.log(NEWS_URL);
    // console.log('★tag&keyword: ', tags.length || keyword ? 'Truthy' : 'Falsy');

    const fetchData = async () => {
      if (tags.length || keyword) return;
      try {
        console.log('GET 요청 url: ', NEWS_URL);
        const res = await axios.get(NEWS_URL);
        const getNewsList = await res.data; // 페이징이 된 데이터

        // 각 객체에 새로운 key 부여하기
        let idCounter = 1;
        getNewsList.forEach((obj) => {
          obj.id = idCounter++;
        });

        setNewsList(getNewsList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

    /*
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
    */
    console.log('From Server, (1st useEffect) newsList: ', newsList);
  }, []);

  useEffect(() => {
    console.log('From Server, (2nd useEffect) newsList: ', newsList);

    // 전체 페이지 수 = 전체 게시물 수 / 페이지 당 게시물 수
    const totalPageCount = Math.ceil(newsList.length / size);
    setTotalPages(totalPageCount);
    // console.log('totalPageCount: ', totalPageCount);
    console.log(`page: ${page}, size: ${size}`);

    if (newsList.length > 0) {
      const filteredList = newsList.filter(
        (board) => board.id >= (page - 1) * size + 1 && board.id <= page * size,
      );
      setPageNewsList(filteredList);
      console.log('From Server, pageNewsList: ', pageNewsList);
    }

    console.log('From Server, pageNewsList: ', pageNewsList);
  }, [newsList, page, size]);

  const getFilterTags = (tags, keyword) => {
    // console.log('=======================');
    // console.log(tags);
    // console.log(keyword);
    setTags(tags);
    setKeyword(keyword);
  };

  // 태그가 바뀔때마다 fetch 요청
  useEffect(() => {
    let region;
    if (tags.includes('kk')) {
      region = '경기';
    } else if (tags.includes('se')) {
      region = '서울';
    } else if (tags.includes('in')) {
      region = '인천';
    } else if (tags.includes('bu')) {
      region = '부산';
    } else if (tags.includes('ul')) {
      region = '울산';
    } else if (tags.includes('kn')) {
      region = '경남';
    } else if (tags.includes('da')) {
      region = '대구';
    } else if (tags.includes('kb')) {
      region = '경북';
    } else if (tags.includes('ku')) {
      region = '광주';
    } else if (tags.includes('jn')) {
      region = '전남';
    } else if (tags.includes('jj')) {
      region = '제주';
    } else if (tags.includes('jb')) {
      region = '전북';
    } else if (tags.includes('kw')) {
      region = '강원';
    } else if (tags.includes('dj')) {
      region = '대전';
    } else if (tags.includes('cb')) {
      region = '충북';
    } else if (tags.includes('cn')) {
      region = '충남';
    } else if (tags.includes('sj')) {
      region = '세종';
    }

    console.log('searching region is ', region);

    const fetchRegionData = async () => {
      if (!tags.length) return;
      try {
        console.log('POST 요청 url: ', NEWS_URL);
        const res = await axios.post(NEWS_URL, { region });
        const getNewsList = await res.data;

        // 각 객체에 새로운 key 부여하기
        let idCounter = 1;
        getNewsList.forEach((obj) => {
          obj.id = idCounter++;
        });

        setNewsList(getNewsList);
        console.log('From Server, (region useEffect) newsList: ', newsList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRegionData();
  }, [tags]);

  // 태그가 바뀔때마다 fetch 요청
  useEffect(() => {
    console.log('changed keyword: ', keyword);

    // 검색하기
    const fetchSearchData = async () => {
      if (!keyword) return;
      try {
        console.log('GET 요청 url: ', API_BASE_URL + SEARCH);
        // http://?name=keyword
        const res = await axios.get(API_BASE_URL + SEARCH, {
          params: { keyword },
        });
        const getNewsList = await res.data; // 페이징이 된 데이터

        // 각 객체에 새로운 key 부여하기
        let idCounter = 1;
        getNewsList.forEach((obj) => {
          obj.id = idCounter++;
        });

        setNewsList(getNewsList);
        console.log('From Server, (keyword) newsList: ', newsList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchSearchData();
  }, [keyword]);

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
