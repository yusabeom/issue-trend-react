import React, { useState } from 'react';
import styles from '../../styles/Footer.module.scss';
import { Reset } from 'styled-reset';
import CircleButton from '../ui/CircleButton';
import { SlArrowUp } from 'react-icons/sl';
import { Box, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const content = {
  mt: 2,
  padding: 2,
  borderRadius: 1,
  boxShadow: 3,
  maxHeight: '300px', // 최대 높이 설정
  overflow: 'auto', // 내용이 넘칠 때 스크롤바 표시
};

const Footer = () => {
  // 맨 위로 버튼 클릭 이벤트 핸들러
  const ScrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 모달창

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Reset />
          <img
            src={require('../../assets/img/logo2.png')}
            alt='로고이미지'
            height='120'
          />
          <ul>
            <li>회사소개</li>
            <li onClick={handleOpen}>이용약관</li>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  이용약관
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  이슈트랜드 서비스를 이용하시는 모든 회원에게 적용되는
                  내용이며, 회원은 이를 숙지해주시기 바랍니다.
                </Typography>
                <Typography sx={content}>
                  제 1장 총칙 제 1조 목적 1. 본 약관은 한국언론진흥재단(이하
                  ‘재단’이라 한다) 이슈트랜드 서비스를 이용함에 있어 이용자의
                  권리, 의무 및 책임사항을 규정함을 목적으로 합니다. 2. 본
                  약관은 재단 빅카인즈 서비스를 이용하는 모든 회원에게 적용되며,
                  이를 읽고 이해하는 것은 귀하의 책임입니다. 본 약관 내용을
                  충분히 숙지하신 후 가입하여 주시기 바랍니다. 제 2조 목적
                  (약관의 효력과 변경) 1. 본 약관은 이슈트랜드 화면에 게시하고
                  이용자가 동의함으로써 효력이 발생합니다.
                </Typography>
              </Box>
            </Modal>
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

        <div className={styles.goUpButton}>
          <CircleButton
            text={<SlArrowUp />}
            onClickEvent={ScrollToTopHandler}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
