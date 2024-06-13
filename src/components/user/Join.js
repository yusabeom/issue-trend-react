import React, { useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

const Join = () => {
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress);
  };

  const addressClickHandler = () => {
    open({ top: 50, left: 50, oncomplete: handleComplete });
  };

  const $fileTag = useRef();
  return (
    <Container
      component='main' // Container가 HTML 태그중 main이 된다.
      className='aspect-ratio' // maxWidth='xs'를 바꿈
      style={{ margin: '0 auto' }}
    >
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h5'>
              회원가입
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              className='thumbnail-box'
              /* onClick={() => $fileTag.current.click() }*/ style={{
                border: '1px solid black',
              }}
            >
              <img
                src={require('../../assets/img/anonymous.jpg')}
                alt='profile'
              />
              {/* require 앞에 imgFile 변수 넣어야 함 */}
            </div>
            <label className='signup-img-label' htmlFor='profile-img'>
              프로필 이미지 추가
            </label>
            <input
              id='profile-img'
              type='file'
              style={{ display: 'none' }}
              accept='image/*' /* 자사/소셜 로그인 진행시 DB에 넣을 때 경로문제 발생할 수도 있음 */
              ref={$fileTag}
              // onChange={showThumbnailHandler} 해야함
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete='fname'
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='이메일을 입력하세요'
              autoFocus
              // onChange = {nameHandler}
            />

            <span
            /* style={correct.userName ? { color: 'green' } : { color: red }}
             */
            ></span>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='영어/특수문자/숫자를 조합해 8자 이상 입력해주세요'
              autoComplete='current-password'
            />
            <span></span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password-check'
              label='패스워드를 한 번 더 입력해주세요'
              type='password'
              id='password-check'
              autoComplete='check-password'
              // onChange={pwCheckHandler}
            />
            <span
              id='check-span'
              // style={
              //   correct.passwordCheck ? { color: 'green' } : { color: 'red' }
              // }
            >
              {/* {message.passwordCheck} */}
            </span>
          </Grid>

          <Grid item xs={9}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='mobile-number'
              label='핸드폰 번호를 입력해주세요'
              type='tel'
              id='mobile-number'
              // autoComplete='check-password'
              // onChange={pwCheckHandler}
            />
            <span
              id='check-span'
              // style={
              //   correct.passwordCheck ? { color: 'green' } : { color: 'red' }
              // }
            >
              {/* {message.passwordCheck} */}
            </span>
          </Grid>
          <Grid item xs={3}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              style={
                { background: '#38d9a9' }
                /* onclick={sendMobileNumberHandler} */
              }
              sx={{
                height: '95%',
              }}
            >
              인증하기
            </Button>
          </Grid>

          <Grid item xs={9}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='mobile-number-check'
              label='인증번호를 입력해주세요'
              type='tel'
              id='mobile-number-check'
            />
            <span
              id='check-span'
              // style={
              //   correct.passwordCheck ? { color: 'green' } : { color: 'red' }
              // }
            >
              {/* {message.passwordCheck} */}
            </span>
          </Grid>
          <Grid item xs={3}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              style={
                { background: '#38d9a9' }
                /* onclick={checkMobileNumberHandler} */
              }
              sx={{
                height: '95%',
              }}
            >
              확인
            </Button>
          </Grid>

          <Grid item xs={9}>
            <TextField
              fullWidth
              placeholder='우편번호'
              id='sample4_postcode'
              name='address'
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type='button'
              sx={{ height: '95%' }}
              style={{ background: '#38d9a9' }}
              fullWidth
              variant='contained'
              onClick={addressClickHandler}
            >
              우편번호 찾기
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='text'
              id='sample4_roadAddress'
              placeholder='주소'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='text'
              id='sample4_detailAddress'
              placeholder='상세주소'
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default Join;
