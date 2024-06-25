import React, { useState } from 'react';
import styles from '../../../styles/ChangeInfo.module.scss';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';

const ChangeInfo = () => {
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState({
    password: '',
    msg: '',
    flag: false,
  });

  const { title, content, inputField, btn } = styles;

  const currentPasswordHandler = (e) => {
    const currentPassword = e.target.value;
    let flag = false;
    let msg;

    if (!currentPassword) {
      msg = '현재 비밀번호 입력은 필수 값입니다.';
    } else {
      flag = true;

      /*
      const res = fetch(`${API_BASE_URL}${USER}/password-check`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
          localStorage.getItem('ACCESS-TOKEN'),
          inputPassword,
        ),
        */
    }
    setPasswordCheck({ password: currentPassword, flag, msg });
    console.log('passwordCheck.password1', passwordCheck.password);
  };
  console.log('passwordCheck.password2', passwordCheck.password);

  const sendCheckPwHandler = async () => {
    console.log('비밀번호 체크할려고 서버에 전송');
    console.log(
      'passwordCheck.password 서버에 전송하기 전 ',
      passwordCheck.password,
    );
    // console.log('type: ', typeof passwordCheck.password); String타입
    const res = await axiosInstance.post(
      `${API_BASE_URL}${USER}/password-check`,
      {
        password: passwordCheck.password,
      },
    );

    const status = res.status;
    const data = res.data;
    if (status === 200) {
      setIsCheckPw(true);
    } else {
      alert(res.data);
    }
  };

  return (
    <>
      {isCheckPw ? (
        <>
          <div className={title}>내정보 변경</div>
          <div className={content}>
            <Container>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='이메일'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='현재비밀번호'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='비밀번호 변경'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='비밀번호 확인'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Container>
            <Container>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='닉네임'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='주소'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id='outlined-required'
                  label='관심주제'
                  defaultValue=''
                  className={inputField}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <Button className={btn}>회원정보변경하기</Button>
              </Grid>
            </Container>
          </div>
        </>
      ) : (
        <>
          <div className='password-check-page'>
            <Typography>현재 비밀번호를 입력하세요</Typography>
            <TextField
              variant='outlined'
              type='password'
              placeholder='현재 비밀번호를 입력해주세요'
              fullWidth
              required
              onBlur={currentPasswordHandler}
            ></TextField>
            <span
              style={passwordCheck.flag ? { color: 'blue' } : { color: 'red' }}
            >
              {passwordCheck.msg}
            </span>
            <Button
              type='button'
              disabled={!passwordCheck.flag}
              onClick={sendCheckPwHandler}
            >
              확인
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeInfo;
