import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/RecentPost.module.scss';

import img from '../../../assets/img/news3.jpg';
import MyPageContext from '../../../utils/MyPageContext';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';
import NewsDetailModal from '../../board/NewsDetailModal';

const BOARD = API_BASE_URL + USER;

const { oneArticle, title, newsAgency } = styles;
const RecentPost = () => {
  const { recentInquiry } = useContext(MyPageContext); // 가장 최근에 본 뉴스 기사 (번호)
  const [recentArticle, setRecentArticle] = useState([]); // 가장 최근에 본 뉴스 기사
  const [clickArticle, setClickArticle] = useState(null);

  const childButtonRef = useRef(null);
  const openModal = (article) => {
    setClickArticle(article);
    console.log('click news article Button!');
  };
  useEffect(() => {
    if (clickArticle) childButtonRef.current.handleOpen();
  }, [clickArticle]);

  // 최근 본 기사 목록 가져오기
  const fetchRecent10 = async (postNo) => {
    try {
      console.log('GET 요청 url: ', BOARD + '/articles/' + postNo);
      const res = await axiosInstance.get(BOARD + '/articles/' + postNo);
      const getNewsDetail = await res.data;

      setRecentArticle((prev) => [...prev, getNewsDetail]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    recentInquiry.map((articleNo) => fetchRecent10(articleNo));
  }, []);

  if (recentArticle.length === 0) {
    return <div>최근에 본 게시물이 존재하지 않습니다</div>;
  }

  return (
    <>
      <table>
        <tbody>
          {recentArticle.map((article) => (
            <tr
              key={article.articleCode}
              className={oneArticle}
              onClick={() => openModal(article)}
            >
              <td className={newsAgency}>{article.newsAgency}</td>
              <td className={title}>{article.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {clickArticle && (
        <div style={{ display: 'none' }}>
          <NewsDetailModal ref={childButtonRef} article={clickArticle} />
        </div>
      )}
    </>
  );
};

export default RecentPost;
