import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/logo.png';
import styles from '../../styles/Header.module.scss';
import ChatModal from '../../components/chat/ChatModal';
import useNavigation from '../func/useNavigation';
import AuthContext from '../../components/store/auth-context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { API_BASE_URL, USER } from '../../config/host-config';

const Header = () => {
  const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`;
  const navigate = useNavigate();
  const { isLoggedIn, onLogout, userEmail } = useContext(AuthContext);

  const [profileUrl, setProfileUrl] = useState(null);

  const logoutHandler = () => {
    onLogout();
    navigate('/login');
  };

  const fetchProfileImage = async () => {
    const res = await fetch(profileRequestURL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    if (res.status === 200) {
      const profileBlob = await res.blob();
      const imgUrl = window.URL.createObjectURL(profileBlob);
      setProfileUrl(imgUrl);
    } else {
      const err = await res.text();
      console.log('err: ' + err);
      setProfileUrl(null);
    }
  };

  const { goLogin, goJoin, goHome, goNews, goBoard } = useNavigation();

  const {
    header,
    headerContainer,
    headerItem,
    items,
    btnGroup,
    btn,
    btn1,
    btn2,
    changeHeader,
    section,
    changeItem,
    changeBtnGroup,
  } = styles;

  // 스크롤시 헤더 색상 변경
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const childButtonRef = useRef(null);

  // '실시간' 메뉴 클릭 이벤트 핸들러
  const openChatModal = () => {
    console.log('click chat Button!');
    childButtonRef.current.handleOpen();
  };

  useEffect(() => {
    if (isLoggedIn) fetchProfileImage();
  }, [isLoggedIn]);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <header
      className={scrollPosition < 10 ? header : `${header} ${changeHeader}`}
    >
      <div className={headerContainer}>
        {scrollPosition < 10 ? (
          <img
            src={logo}
            height='100'
            alt='로고이미지'
            onClick={goHome}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          ''
        )}
        <div
          className={
            scrollPosition < 10 ? headerItem : `${headerItem} ${changeItem}`
          }
        >
          <div className={items} onClick={goNews}>
            뉴스{' '}
          </div>
          <div>|</div>
          <div className={items} onClick={goBoard}>
            게시판{' '}
          </div>
          <div>|</div>
          <div className={items} onClick={openChatModal}>
            실시간
          </div>
          <div style={{ display: 'none' }}>
            <ChatModal ref={childButtonRef} />
          </div>
        </div>

        <div
          className={
            scrollPosition < 10 ? btnGroup : `${btnGroup} ${changeBtnGroup}`
          }
        >
          {/* {isLoggedIn && (<div></div>) */}
          {isLoggedIn ? (
            <>
              <div>{userEmail + '님 안녕하세요'}</div>
              <img
                src={profileUrl || require('../../assets/img/anonymous.jpg')}
                alt='프로필 사진'
                style={{
                  marginLeft: 20,
                  width: 75,
                  borderRadius: '50%',
                  height: 75,
                }}
              />
              <Button className='logout-btn' onClick={logoutHandler}>
                로그아웃
              </Button>
            </>
          ) : (
            <div>
              <div className={`${btn} ${btn1}`} onClick={goLogin}>
                로그인
              </div>
              <div className={`${btn} ${btn2}`} onClick={goJoin}>
                회원가입
              </div>
            </div>
          )}
          {/*<div>
              {/* {localStorage.getItem('login-flag')}님 안녕하세요. */}
          {/* <div className={`${btn} ${btn1}`} onClick={goLogin}></div>
              <div className={`${btn} ${btn2}`} onClick={goJoin}>
                회원가입
              </div>
            </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
