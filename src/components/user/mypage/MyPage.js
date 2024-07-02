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
  console.log(`profileImage: `, profileImage); // "null"

  const [activeComponent, setActiveComponent] = useState('');

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleDeleteUser = async () => {
    try {
      console.log(localStorage.getItem('ACCESS_TOKEN'));
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
  return (
    <div className='aspect-ratio'>
      <div className={mypageContainer}>
        <div className={side}>
          <h1 className={title}>마이페이지</h1>
          <ul className={titleContent}>
            <li onClick={() => handleComponentChange('recent')}>
              최근의 본 글
            </li>
            <li onClick={() => handleComponentChange('write')}>작성글</li>
            <li onClick={() => handleComponentChange('scrap')}>스크랩</li>
            <li onClick={() => handleComponentChange('change')}>내정보변경</li>
            <li onClick={handleDeleteUser}>회원탈퇴</li>
          </ul>
        </div>
        <div className={mainContainer}>
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
                <li>20</li>
                <li>10</li>
                <li>20</li>
              </ul>
              <ul className={second}>
                <li>작성글</li>
                <li>댓글</li>
                <li>스크랩</li>
              </ul>
            </div>
          </div>

          <div className={content}>
            {activeComponent === 'change' && <ChangeInfo />}
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
