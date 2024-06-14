import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png';
import styles from '../../styles/Header.module.scss';
import useNavigation from '../func/useNavigation';

const Header = () => {
  const { goLogin, goJoin, goHome, goNews, goBoard, goChat } = useNavigation();

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
          <div className={items} onClick={goChat}>
            실시간
          </div>
        </div>

        <div
          className={
            scrollPosition < 10 ? btnGroup : `${btnGroup} ${changeBtnGroup}`
          }
        >
          <div className={`${btn} ${btn1}`} onClick={goLogin}>
            로그인
          </div>
          <div className={`${btn} ${btn2}`} onClick={goJoin}>
            회원가입
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
