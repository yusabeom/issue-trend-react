import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/MyPage.module.scss';
import ChangeInfo from './ChangeInfo';
import RecentPost from './RecentPost';
import WritePost from './WritePost';
import ScrapPost from './ScrapPost';
import axiosInstance from '../../../config/axios-config';
import { API_BASE_URL, USER } from '../../../config/host-config';
import AuthContext from '../../store/auth-context';
import { Navigate, useNavigate } from 'react-router-dom';
import MyPageContext from '../../../utils/MyPageContext';
import KakaoChangeInfo from './KakaoChangeInfo';

const {
  mypageContainer,
  side,
  title,
  mainContainer,
  head,
  content,
  changeInfo,
  myPost,
  titleContent,
  headTitle,
  headContent,
  first,
  second,
} = styles;

const MyPage = () => {
  const navigate = useNavigate();
  const { profileImage, onLogout, onLogin } = useContext(AuthContext);

  const [formattedPost, setFormattedPost] = useState([]);
  const { recentInquiry } = useContext(MyPageContext);
  const LOGIN_PATH = localStorage.getItem('LOGIN_PATH');

  const SCRAP = API_BASE_URL + USER + '/scrap';
  const [scrapList, setScrapList] = useState([]);

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

  useEffect(() => {
    fetchMyPosts();
  }, []);

  useEffect(() => {
    fetchScrap();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}${USER}/search-post-user`,
      );
      if (response.status !== 200) {
        console.log('Failed to fetch user posts');
        throw new Error('Failed to fetch user posts');
      }
      const data = response.data;

      const formatPosts = data.map((post) => ({
        title: post.title,
        text: post.text,
        formatDate: post.formatDate,
        postNo: post.postNo,
      }));

      setFormattedPost(formatPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  console.log(`profileImage: `, profileImage); // "null"

  const [activeComponent, setActiveComponent] = useState('write');

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleDeleteUser = async () => {
    try {
      if (confirm('정말 탈퇴하시겠어요?')) {
        const res = await axiosInstance.delete(`${API_BASE_URL}${USER}/delete`);
        if (res.status === 200) {
          alert('그동안 저희 사이트를 사랑해주셔서 감사합니다.');
          onLogout();
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('탈퇴 요청 중 오류 발생: ', error);
    }
  };

  //
  return (
    <div className={styles.backScreen}>
      <div className={mypageContainer}>
        <div className={side}>
          <h1 className={title}>마이페이지</h1>
          <ul className={titleContent}>
            <li
              className={activeComponent === 'write' && styles.activeStyle}
              onClick={() => handleComponentChange('write')}
            >
              작성글
            </li>
            <li
              className={activeComponent === 'recent' && styles.activeStyle}
              onClick={() => handleComponentChange('recent')}
            >
              최근에 본 글
            </li>
            <li
              className={activeComponent === 'scrap' && styles.activeStyle}
              onClick={() => handleComponentChange('scrap')}
            >
              스크랩 기사
            </li>
            <li
              className={activeComponent === 'change' && styles.activeStyle}
              onClick={() => handleComponentChange('change')}
            >
              내정보 변경
            </li>
            <li onClick={handleDeleteUser}>회원탈퇴</li>
          </ul>
        </div>
        <div className={mainContainer}>
          {activeComponent === 'change' ? (
            ''
          ) : (
            <>
              <div className={head}>
                <div className={headTitle}>
                  <img
                    src={
                      profileImage === 'null'
                        ? require('../../../assets/img/anonymous.jpg')
                        : profileImage
                    }
                    alt='프로필 사진'
                    style={{
                      width: 75,
                      borderRadius: '50%',
                      height: 75,
                    }}
                  />
                  <h2>{localStorage.getItem('NICK_NAME')}</h2>
                </div>
                <div className={headContent}>
                  <ul className={first}>
                    <li onClick={() => handleComponentChange('write')}>
                      {formattedPost.length}
                    </li>
                    <li onClick={() => handleComponentChange('recent')}>
                      {recentInquiry.length}
                    </li>

                <li onClick={() => handleComponentChange('scrap')}>
                  {scrapList.length}
                </li>
              </ul>
              <ul className={second}>
                <li>작성글</li>
                <li>최근본 글</li>
                <li>스크랩</li>
              </ul>
            </div>
          </div>

          <div className={content}>
            {activeComponent === 'change' &&
              (LOGIN_PATH === 'KAKAO' ? <KakaoChangeInfo /> : <ChangeInfo />)}
            {activeComponent === 'recent' && <RecentPost />}
            {activeComponent === 'scrap' && <ScrapPost />}
            {activeComponent === 'write' && <WritePost />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
