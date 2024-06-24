import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/ScrapPost.module.scss';
import img from '../../../assets/img/news3.jpg';
import AuthContext from '../../store/auth-context';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axios from 'axios';
const { title, post, postContent } = styles;

const SCRAP = API_BASE_URL + USER + '/scrap'; // '/issue-trend/scrap'
const ScrapPost = () => {
  const { isLoggedIn, onLogout, userEmail, profileImage, nickname, userNo } =
    useContext(AuthContext);

  const [scrapList, setScrapList] = useState([]);

  useEffect(async () => {
    // 렌더링 할 때 로그인 한 유저의 스크랩 기사 보여주기

    try {
      console.log('GET url: ', SCRAP + `/${userNo}`);
      const res = await axios.get(SCRAP + `/${userNo}`);
      const getScrapList = res.data;
      setScrapList(getScrapList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <header className={styles.header}>
        스크랩 기사 {scrapList.length} 건
      </header>
      <ul className={styles.scrapList}>
        {scrapList.map((board) => (
          <li key={board.articleCode} className={post}>
            <div className={styles.imgContainer}>
              <img src={board.img} />
              <div className={styles.title}>{board.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ScrapPost;
