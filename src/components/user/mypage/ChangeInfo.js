import React, { useState } from 'react';
import styles from '../../../styles/ChangeInfo.module.scss';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';
import axios from 'axios';

const ChangeInfo = () => {
  const { title, inputField, btn } = styles; /*content,*/
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState({
    password: '',
    msg: '',
    flag: false,
  });

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
      alert(data);
    }
  };

  // 내 정보 변경 페이지
  const [userValue, setUserValue] = useState({
    nickname1: localStorage.getItem('NICK_NAME'),
    password1: '',
    regionName1: localStorage.getItem('REGION_NAME'),
    favoriteKeywords1: localStorage.getItem('FAVORITE_KEYWORDS'),
  });
  const { nickname1, password1, regionName1, favoriteKeywords1 } = userValue;
  console.log(nickname1, password1, regionName1, favoriteKeywords1);

  const [message, setMessage] = useState({
    nickname1: '',
    password1: '',
    passwordCheck1: '',
    regionName1: '',
  });

  const [correct, setCorrect] = useState({
    nickname1: false,
    password1: false,
    passwordCheck1: false,
    regionName1: false,
  });

  const saveInputState = ({ key, inputValue, msg, flag }) => {
    console.log('values: ', { key, inputValue, msg, flag });
    inputValue !== 'pass' &&
      setUserValue((oldVal) => {
        return { ...oldVal, [key]: inputValue };
      });

    setMessage((oldMsg) => {
      return { ...oldMsg, [key]: msg };
    });

    setCorrect((oldCorrect) => {
      return { ...oldCorrect, [key]: flag };
    });
  };

  // 닉네임 변경
  const nickChangeHandler = async (e) => {
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
    const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const inputValue = e.target.value.trim();

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '닉네임은 필수값 입니다.';
    } else if (!nickRegex.test(inputValue)) {
      msg = '2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 조합해주세요';
    } else {
      // 로컬 스토리지에서 꺼내서 현재 닉네임이랑 비교해야 하는건지
      await nickFetchDuplicateCheck(inputValue);
      return;
    }

    saveInputState({
      key: 'nickname1',
      inputValue,
      msg,
      flag,
    });
  };
  // 비밀번호

  const nickFetchDuplicateCheck = async (nickname) => {
    let msg = '';
    let flag = false;

    try {
      const res = await axios.get(`${API_BASE_URL}${USER}/nick-check`, {
        params: { nickname },
      });

      const result = res.data;
      console.log(`nick중복체크 결과: ${result}`);

      if (result) {
        msg = '닉네임 중복되었습니다. 다른 닉네임을 입력해주세요.';
      } else {
        msg = '사용 가능한 닉네임 입니다.';
        flag = true;
        saveInputState({ key: 'nickname1', inputValue: nickname, msg, flag });
      }
    } catch (error) {
      msg = '중복 확인 중 오류가 발생했습니다.';
      console.error(error);
    }
  };

  const passwordHandler = (e) => {
    document.getElementById('password-check').value = '';
    setMessage({ ...message, passwordCheck: '' });
    setCorrect({ ...correct, passwordCheck: false });
    // 영문자 숫자 조합이 8자 이상
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const inputValue = e.target.value.trim();

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '비밀번호는 필수값 입니다.';
    } else if (!passwordRegex.test(inputValue)) {
      msg = '8글자 이상의 영문, 숫자를 포함해주세요.';
    } else {
      msg = '사용가능한 비밀번호 입니다.';
      flag = true;
    }

    saveInputState({ key: 'password1', inputValue, msg, flag });
  };

  const pwCheckHandler = (e) => {
    let msg;
    let flag = false;

    if (!e.target.value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password1 !== e.target.value) {
      msg = '입력한 비밀번호와 다릅니다.';
    } else {
      msg = '비밀번호가 일치합니다.';
      flag = true;
    }

    saveInputState({
      key: 'passwordCheck1',
      inputValue: 'pass',
      msg,
      flag,
    });
  };

  return (
    <>
      {isCheckPw ? (
        <>
          <div className={title}>내정보 변경</div>
          {/*<div className={content}></div>*/}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                id='email'
                label={localStorage.getItem('LOGIN_EMAIL')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='nickname1'
                label='닉네임'
                type='text'
                id='nickname1'
                autoComplete='nickname1'
                onChange={nickChangeHandler}
              />
              <span
                id='check-span'
                style={
                  correct.nickname1 ? { color: 'green' } : { color: 'red' }
                }
              >
                {message.nickname1}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password1'
                label='패스워드'
                placeholder='변경할 패스워드를 입력해주세요'
                autoComplete='current-password'
                onChange={passwordHandler}
              />
              <span
                id='check-span'
                style={
                  correct.password1 ? { color: 'green' } : { color: 'red' }
                }
              >
                {message.password1}
              </span>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password-check'
                label='패스워드 확인'
                type='password'
                id='password-check'
                autoComplete='check-password'
                onChange={pwCheckHandler}
              />
              <span
                id='check-span'
                style={
                  correct.passwordCheck1 ? { color: 'green' } : { color: 'red' }
                }
              >
                {message.passwordCheck1}
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                id='regionName'
                name='regionName'
                inputProps={{ readOnly: true }}
                value={userValue.regionName}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type='button'
                sx={{ height: '95%' }}
                style={{ background: '#38d9a9' }}
                fullWidth
                variant='contained'
                // onClick={addressClickHandler}
                // startIcon={<PinDropIcon />}
              >
                내 동네 설정
              </Button>
            </Grid>
            <Grid item xs={12}>
              <h6>issue-trend가 맞춤형 뉴스를 제공합니다.</h6>
            </Grid>
            <TextField
              type='text'
              placeholder='관심 키워드를 입력하고 엔터를 누르세요'
              id='keyword'
              // onKeyUp={(e) => {
              //   if (e.key === 'Enter') {
              //     // handleKeyDown(e.target.value);
              //   }
              // }}
            />
            <Grid item xs={12}>
              <ul style={{ display: 'flex', justifyContent: '' }}>
                {/* {keywords.map((keyword) => {
                    return (
                      <li
                        style={{ border: 'solid 1px black' }}
                        // onClick={deleteHandler}
                        key={keyword.id}
                      >
                        {keyword.value}
                      </li>
                    );
                  })} */}
              </ul>
            </Grid>
            <Grid>
              <Button className={btn}>회원정보변경하기</Button>
            </Grid>
          </Grid>
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
