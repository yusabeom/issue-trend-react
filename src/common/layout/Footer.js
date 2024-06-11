import React from 'react';
import styles from '../../styles/Footer.module.scss';
import { Reset } from 'styled-reset';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Reset />
          <img
            src={require('../../assets/img/logo.png')}
            alt='로고이미지'
            height='120'
          />
          <ul>
            <li>회사소개</li>
            <li>이용약관</li>
            <li>고객센터</li>
            <li>개인정보처리방침</li>
          </ul>
          <ul>
            <li>로그인</li>
            <li>로그아웃</li>
            <li>뉴스</li>
            <li>제보게시판</li>
          </ul>
          <ul className={styles.none}>
            <li>전화번호 : 02-0000-1234</li>
            <li>주소 : 서울특별시 마포구 백범로 23, 3층</li>
            <li>발행인 : 이슈트랜드</li>
            <li>등록일자 : 2024년 6월 10일</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
