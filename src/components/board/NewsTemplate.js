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
import { Spinner } from 'reactstrap';

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
  const [loading, setLoading] = useState(true);
  const [noItem, setNoItem] = useState(false);
  const [error, setError] = useState(null);
  const [newsAgencies, setNewsAgencies] = useState([]); // 뉴스 언론사

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1; // 현재 페이지
  const size = searchParams.get('size') || 20; // amound (페이지 당 게시물 개수)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('GET 요청 url: ', NEWS_URL);
        setLoading(true);
        const res = await axios.get(NEWS_URL);
        const getNewsList = await res.data; // 페이징이 된 데이터

        setNewsList(getNewsList);
      } catch (error) {
        // console.error('Error fetching data: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 전체 페이지 수 = 전체 게시물 수 / 페이지 당 게시물 수
    const totalPageCount = Math.ceil(newsList.length / size);
    setTotalPages(totalPageCount);
    console.log(`page: ${page}, size: ${size}`);

    if (newsList.length > 0) {
      setNoItem(false);
      // 뉴스 언론사 배열 가져오기
      const newsAgencySet = new Set(newsList.map((news) => news.newsAgency));
      setNewsAgencies(Array.from(newsAgencySet));
      // console.log(newsAgencies);
    } else {
      setNoItem(true);
    }
  }, [newsList, page, size]);

  const getFilterTags = (tagObject) => {
    setTags(tagObject);
    console.log(tagObject);
  };

  useEffect(() => {
    // 서버에 요청
    const fetchRegionData = async () => {
      if (!tags.length) return;

      try {
        // /issue-trend/todayArticles (requestBody)
        console.log('POST 요청 url: ', NEWS_URL, ', tags:', tags);
        // setLoading(true);
        // const res = await axios.post(NEWS_URL, tags);
        // const getNewsList = res.data;
        // console.log('지역 요청 후 응답: ', getNewsList);
        // setNewsList(getNewsList);
        // console.log('From Server, (region useEffect) newsList: ', newsList);
      } catch (error) {
        // console.error('Error fetching data: ', error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegionData();
  }, [tags]);

  // 키워드가 바뀔때마다 fetch 요청
  useEffect(() => {
    // 검색하기
    const fetchSearchData = async () => {
      if (!keyword) return;
      try {
        console.log(
          'GET 요청 url: ',
          API_BASE_URL + SEARCH + '?keyword=' + keyword,
        );
        // http://localhost:8181/issue-trend/search?keyword=고속 (requestParam)
        const res = await axios.get(API_BASE_URL + SEARCH, {
          params: { keyword },
        });
        const getNewsList = res.data; // 페이징이 된 데이터

        setNewsList(getNewsList);
        // console.log('From Server, (keyword) newsList: ', newsList);
      } catch (error) {
        // console.error('Error fetching data: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchData();
  }, [keyword]);

  if (loading) {
    return (
      <div style={{ margin: '20vh' }}>
        <Spinner color='danger'>잠시만 기다려주세요...</Spinner>
      </div>
    );
  }

  if (error) {
    return <div style={{ margin: '20vh' }}>Error: {error}</div>;
  }

  return (
    <>
      <div className='news-wrapper aspect-ratio'>
        <Filter onTags={getFilterTags} agencies={newsAgencies} />
        <div>
          <p style={{ padding: '1rem 0 0' }}>
            {newsList.length}건의 기사가 검색되었습니다
          </p>
        </div>
        {noItem ? (
          <div style={{ margin: '20vh' }}>기사가 존재하지 않습니다</div>
        ) : (
          <NewsList
            newsList={newsList}
            page={page}
            size={size}
            count={totalPages}
          />
        )}
      </div>
    </>
  );
};

export default NewsTemplate;
