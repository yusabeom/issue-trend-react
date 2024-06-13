import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png';
import styles from '../../styles/Header.module.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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

  const navigate = useNavigate();
  const joinClickHandler = () => {
    navigate('/join');
  };

  // 스크롤시 헤더 색상 변경
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

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
          <img src={logo} height='100' alt='로고이미지' />
        ) : (
          ''
        )}
        <div
          className={
            scrollPosition < 10 ? headerItem : `${headerItem} ${changeItem}`
          }
        >
          <div className={items}>뉴스 </div>
          <div>|</div>
          <div className={items}>게시판 </div>
          <div>|</div>
          <div className={items}>실시간</div>
        </div>

        <div
          className={
            scrollPosition < 10 ? btnGroup : `${btnGroup} ${changeBtnGroup}`
          }
        >
          <div className={`${btn} ${btn1}`}>로그인</div>
          <div className={`${btn} ${btn2}`} onClick={joinClickHandler}>
            회원가입
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
