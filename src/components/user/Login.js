import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import { KAKAO_AUTH_URL } from '../../config/Kakao-config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordResetModal from './PasswordResetModal';

const Login = () => {
  // http://localhost:8181/issue-trend/login
  const REQUEST_URL = BASE + USER + '/login';
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    console.log('모달 열기');
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    console.log('모달 닫기');
    setIsModalOpen(false);
  };

  const [showPw, setShowPw] = useState(false);
  const handleToggleShowPw = () => {
    setShowPw((prevShowPw) => !prevShowPw);
  };

  const fetchLogin = async () => {
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');
    console.log($email.value, $password.value);
    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const {
      token,
      email,
      loginPath,
      profileImage,
      regionName,
      nickname,
      userNo,
    } = await res.json();
    console.log('token:', token);
    console.log('email:', email);
    console.log('loginPath:', loginPath);
    console.log('profileImage:', profileImage);
    console.log('regionName:', regionName);
    console.log('nickname:', nickname);
    onLogin(
      token,
      email,
      loginPath,
      profileImage,
      regionName,
      nickname,
      userNo,
    );
    navigate('/home'); // --> 경로를 어디로 지정해야 하나 /home?
  };

  const loginHandler = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  const initialFindEmailState = {
    email: '',
    error: '',
  };

  const [findPwValue, setFindPwValue] = useState(initialFindEmailState);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  const findPasswordEmailHandler = (e) => {
    const inputValue = e.target.value;
    let error = '';

    if (!inputValue) {
      error = '이메일은 필수값 입니다.';
    } else if (!emailRegex.test(inputValue)) {
      error = '이메일 형식이 올바르지 않습니다.';
    }

    setFindPwValue({
      email: inputValue,
      error,
    });

    setIsEmailValid(!error); // error가 비어있으면 true, 아니면 false
  };

  const isModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Container
      component='main'
      maxWidth='xs'
      style={{
        margin: '20vh auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5'>
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={loginHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='이메일'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='비밀번호'
              required
              fullWidth
              id='password'
              name='password'
              autoComplete='current-password'
              type={showPw ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleToggleShowPw} edge='end'>
                      {showPw ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              style={{ padding: '4% 0' }}
            >
              로그인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <a href={KAKAO_AUTH_URL}>
              <img
                style={{ width: '100%' }}
                alt='kakaobtn'
                src={require('../../assets/img/kakao_login_medium_wide.png')}
              />
            </a>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Link to='/join'>회원가입</Link>
            </Grid>
            <Grid item xs={6}>
              <MuiLink href='#' onClick={handleOpenModal} underline='hover'>
                비밀번호 찾기
              </MuiLink>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <PasswordResetModal
        isModalOpen={isModalOpen}
        isModalClose={isModalClose}
      />
      {/* 비밀번호 찾기 모달 */}
      {/* <Dialog open={isModalOpen}> */}
      {/*
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
            onChange={findPasswordEmailHandler}
          />
          <span style={{ color: 'red' }}>{findPwValue.error}</span>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={() => {
              console.log('취소 누름');
              handleCloseModal();
            }}
          >
            취소
          </Button>
          <Button
            color='primary'
            disabled={!isEmailValid} /*onClick={findPasswordHandler}
          >
            전송
          </Button>
        </DialogActions>
      </Dialog>
      */}
    </Container>
  );
};

export default Login;
