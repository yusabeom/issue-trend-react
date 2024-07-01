import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/RecentPost.module.scss';

import img from '../../../assets/img/news3.jpg';
import MyPageContext from '../../../utils/MyPageContext';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';

const BOARD = API_BASE_URL + USER;

const { title, post, postContent } = styles;
const RecentPost = () => {
  const { recentInquiry } = useContext(MyPageContext); // 가장 최근에 본 뉴스 기사 (번호)
  const [recentArticle, setRecentArticle] = useState([]); // 가장 최근에 본 뉴스 기사

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
  return (
    <>
      <div>
        {recentArticle.map((article) => (
          <div>
            <p>{article.title}</p>
            <p>{article.truncatedText}</p>
          </div>
        ))}
      </div>
      <div className={title}>최근의 본글</div>
      <div className={post}>
        <img src={img} />
        <ul className={postContent}>
          <li>제목</li>
          <li>내용</li>
        </ul>
      </div>
      <div className={post}>
        <img src={img} />
        <ul className={postContent}>
          <li>제목</li>
          <li>내용</li>
        </ul>
      </div>
    </>
  );
};

export default RecentPost;
