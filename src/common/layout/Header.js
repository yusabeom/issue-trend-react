import React from 'react';
import logo from '../../assets/img/logo.png';
import styles from '../../styles/Header.module.scss';

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
  } = styles;

  return (
    <header className={header}>
      <div className={headerContainer}>
        <img src={logo} height='100' alt='로고이미지' />
        <div className={headerItem}>
          <div className={items}>뉴스 </div>
          <div>|</div>
          <div className={items}>게시판 </div>
          <div>|</div>
          <div className={items}>실시간</div>
        </div>

        <div className={btnGroup}>
          <div className={`${btn} ${btn1}`}>로그인</div>
          <div className={`${btn} ${btn2}`}>회원가입</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
