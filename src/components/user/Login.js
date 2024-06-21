import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Login = () => {
  // http://localhost:8181/issue-trend/login
  const REQUEST_URL = BASE + USER + '/login';
  const { onLogin } = useContext(AuthContext);
  // onLogin: () => {},
  const navigate = useNavigate();

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

    const { token, email, loginPath, profileImage, regionName } =
      await res.json();
    console.log('token:', token);
    console.log('email:', email);
    console.log('loginPath:', loginPath);
    console.log('profileImage:', profileImage);
    console.log('regionName:', regionName);
    onLogin(token, email, loginPath, profileImage, regionName);
    navigate('/home'); // --> 경로를 어디로 지정해야 하나 /home?
  };

  const loginHandler = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  // console.log(`지도 키 값: ${process.env.REACT_APP_KAKAOMAP_KEY}`);

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
              required
              fullWidth
              id='password'
              label='비밀번호'
              name='password'
              autoComplete='current-password'
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

          <Grid container>
            <Grid item xs={6}>
              <Link to='/join'>회원가입</Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='#'>비밀번호 찾기</Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
