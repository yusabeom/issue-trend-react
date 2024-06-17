import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { Link } from 'react-router-dom';

const Login = () => {
  const REQUEST_URL = BASE + USER + '/signin';

  const fetchLogin = () => {
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: $email.value, password: $password.value }),
    })
      .then((res) => res.text())
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err);
      });
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
