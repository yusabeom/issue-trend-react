import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/ScrapPost.module.scss';
import img from '../../../assets/img/news3.jpg';
import AuthContext from '../../store/auth-context';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axios from 'axios';
import basicImage from '../../../assets/img/logo.png';
import axiosInstance from '../../../config/axios-config';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { title, post, postContent } = styles;

const SCRAP = API_BASE_URL + USER + '/scrap'; // '/issue-trend/scrap'
const ScrapPost = () => {
  const { isLoggedIn, onLogout, userEmail, profileImage, nickname, userNo } =
    useContext(AuthContext);

  const [scrapList, setScrapList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate;

  // 스크랩 게시물 삭제 이벤트 핸들러
  const onDeleteScrap = (e) => {
    const articleCode = e.target.parentNode.parentNode.value
      .toString()
      .padStart(10, '0');

    console.log('DELETE url: ', SCRAP + `/delete/${articleCode}`);
    try {
      axiosInstance.delete(SCRAP + `/delete/${articleCode}`);
      console.log('삭제 완료');

      fetchScrap();
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 렌더링 할 때 로그인 한 유저의 스크랩 기사 보여주기
  const fetchScrap = async () => {
    try {
      console.log('GET url: ', SCRAP + '/user');
      const res = await axiosInstance.get(SCRAP + '/user');
      const getScrapList = res.data;
      setScrapList(getScrapList);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchScrap();
  // }, []);

  useEffect(() => {
    fetchScrap();
  }, [snackbarOpen]);

  // 스낵바 닫기 이벤트
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        스크랩 기사 {scrapList.length} 건
      </header>
      <ul className={styles.scrapList}>
        {scrapList.map((board) => (
          <li
            key={board.articleCode}
            value={board.articleCode}
            className={post}
          >
            <div className={styles.imgContainer}>
              <button className={styles.closeBtn} onClick={onDeleteScrap}>
                x
              </button>
              {board.img === '이미지를 찾을 수 없습니다' ? (
                <img
                  src={basicImage}
                  className={styles.basicImg}
                  alt='기본 이미지'
                  onClick={() => {
                    window.location.href = board.articleLink;
                  }}
                />
              ) : (
                <img
                  src={board.img}
                  className={styles.articleImg}
                  alt='스크랩 기사'
                  onClick={() => {
                    window.location.href = board.articleLink;
                  }}
                />
              )}
              <div
                className={styles.title}
                onClick={() => {
                  window.location.href = board.articleLink;
                }}
              >
                {board.title}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          정상적으로 삭제되었습니다!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ScrapPost;
