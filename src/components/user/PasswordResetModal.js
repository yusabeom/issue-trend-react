import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';

const PasswordResetModal = ({ isModalOpen, isModalClose }) => {
  console.log('PasswordResetModal.js 파일로 들어옴');

  const isModalClickClose = () => {
    isModalClose();
  };

  const [inputEmailState, setInputEmailState] = useState({
    inputEmail: '',
    msg: '',
    flag: false,
  });

  const fetchDuplicateCheck = async (inputEmail) => {
    let msg = '';
    let flag = false;

    try {
      const res = await axios.get(`${API_BASE_URL}${USER}/check`, {
        params: { email: inputEmail },
      });

      const result = res.data;
      console.log(`결과: ${result}`);

      if (result) {
        flag = true;
      } else {
        msg = '회원정보가 없습니다. 회원가입을 먼저 해주세요';
      }
    } catch (error) {
      console.error(error);
    }

    setInputEmailState({
      inputEmail,
      msg,
      flag,
    });
  };

  const inputSendEmailHandler = async (e) => {
    const inputEmail = e.target.value;
    const inputEmailRegEx = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    let msg = '';
    let flag = false;
    if (!inputEmail) {
      msg = '이메일 주소 입력은 필수입니다.';
    } else if (!inputEmailRegEx.test(inputEmailRegEx)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      await fetchDuplicateCheck(inputEmail);
      return;
    }
    setInputEmailState({
      inputEmail,
      msg,
      flag,
    });
  };

  return (
    /* 비밀번호 찾기 모달 */
    /* <Dialog open={isModalOpen}> */
    <Dialog open={isModalOpen} maxWidth='sm' fullWidth>
      <DialogTitle>비밀번호 찾기</DialogTitle>
      <DialogContent>
        <Typography>이메일을 입력하세요</Typography>
        <TextField
          autoFocus
          margin='dense'
          id='findPasswordEmail'
          label='이메일 주소'
          type='email'
          fullWidth
          onBlur={inputSendEmailHandler}
          // onChange={findPasswordEmailHandler}
        />
        <span style={{ color: 'red' }}>{/*{findPwValue.femailMsg}*/}</span>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={isModalClickClose}>
          취소
        </Button>
        <Button
          color='primary'
          // disabled={!isEmailValid}
          /*onClick={() => {
            findPasswordSenderHandler();
            console.log('이메일 전송 버튼 클릭됨');
          }}
            */
        >
          전송
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetModal;
