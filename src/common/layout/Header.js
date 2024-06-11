import React from 'react';
import logo from '../../assets/img/logo.png';
import styles from '../../styles/Header.scss';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <img src={logo} height='100' alt='로고이미지' />
        <div className='header-item'>
          <div className='items news'>뉴스 </div>
          <div>|</div>
          <div className='items board'>게시판 </div>
          <div>|</div>
          <div className='items chat'>실시간</div>
        </div>

        <div className='btn-group'>
          <div className='btn btn1'>로그인</div>
          <div className='btn btn2'>회원가입</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
