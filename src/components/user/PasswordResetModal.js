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
import { useNavigate } from 'react-router-dom';

const PasswordResetModal = ({ isModalOpen, isModalClose }) => {
  const navigate = useNavigate();

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
        msg = '전송버튼을 누르면 해당 메일로 임시비밀번호가 전송됩니다.';
        // db에서 확인했을 때 회원 이메일이 있는 것
        // fetch('', )
        flag = true; // flag가 true일 때 전송버튼 활성화 시킴
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
  const [writable, setWritable] = useState(false);
  const sendPasswordHandler = async (e) => {
    // 이메일 입력창을 막는다.
    e.preventDefault();
    setWritable(true);
    //issue-trend/send-password
    const response = await fetch(
      `${API_BASE_URL}${USER}/send-password?email=${inputEmailState.inputEmail}`,
    );
    // .then((res) => return res.text()) // 프라미스를 받아서 텍스트로 변환 했는데,
    // .then((data) => console.log(data)) // 왜 또 프라미스야 프라미스를 콘솔로 찍으면 찍힌다고? 그럼 프라미스가 찍히는 거야? ---> 근데 undefined가 찍힘
    // .catch((err) => console.log(err)); // 에러야

    if (response.ok) {
      console.log(`response: ${response}`);
      const data = await response.text();
      console.log(`data는 프라미스니?: ${data}`);
      alert('이메일로 임시비밀번호를 전송했습니다. 확인후 로그인해주세요.');
      // navigate('/login'); // 이미 로그인 페이지라 모달만 닫아야한다.
      isModalClickClose();
    } else if (!response.ok) {
      const error = await response.text();
      alert('임시비밀번호를 다시 요청해주시기 바랍니다.');
    }
  };

  const inputSendEmailHandler = async (e) => {
    const inputEmail = e.target.value;
    const inputEmailRegEx = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    let msg = '';
    let flag = false;
    if (!inputEmail) {
      msg = '이메일 주소 입력은 필수입니다.';
    } else if (!inputEmailRegEx.test(inputEmail)) {
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
          onChange={inputSendEmailHandler}
          disabled={writable}
        />
        <span
          style={inputEmailState.flag ? { color: 'blue' } : { color: 'red' }}
        >
          {inputEmailState.msg}
        </span>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={isModalClickClose}>
          취소
        </Button>
        {inputEmailState.flag ? (
          <Button color='primary' onClick={sendPasswordHandler}>
            전송
          </Button>
        ) : (
          <Button
            color='primary'
            disabled
            /*onClick={() => {
            findPasswordSenderHandler();
            console.log('이메일 전송 버튼 클릭됨');
          }}
            */
          >
            전송
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetModal;
