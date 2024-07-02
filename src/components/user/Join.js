import React, { useEffect, useRef, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { API_BASE_URL, USER } from '../../config/host-config';
import styles from '../../styles/Join.module.scss';
import { AccessAlarm, Visibility, VisibilityOff } from '@mui/icons-material';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import useNavigation from '../../common/func/useNavigation';

const { kakao } = window;
const Join = () => {
  const navigate = useNavigate();
  /*
  const [showPw, setShowPw] = useState(false);
  const handleToggleShowPw = (e) => {
    console.log(showPw);
    setShowPw((prveShowPw) => !prveShowPw);
    console.log(showPw);
  };
  */

  const [userValue, setUserValue] = useState({
    email: '',
    nickname: '',
    password: '',
    regionName: '',
  });

  const [message, setMessage] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    regionName: '',
  });

  const [correct, setCorrect] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
    regionName: false,
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

  const fetchDuplicateCheck = async (email) => {
    let msg = '';
    let flag = false;

    try {
      const res = await axios.get(`${API_BASE_URL}${USER}/check`, {
        params: { email },
      });

      /*
      const res = await axios.get(API_BASE_URL + SEARCH, {
        params: { keyword },
      });
const getNewsList = res.data;
// http://localhost:8181/issue-trend/search?keyword=고속
*/

      // const result = await res.json();
      const result = res.data;
      console.log(`결과: ${result}`);

      if (result) {
        msg = '이메일이 중복되었습니다.';
      } else {
        msg = '사용 가능한 이메일 입니다.';
        flag = true;
      }
    } catch (error) {
      msg = '중복 확인 중 오류가 발생했습니다.';
      console.error(error);
    }

    saveInputState({ key: 'email', inputValue: email, msg, flag });
  };

  const emailHandler = async (e) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다.';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      await fetchDuplicateCheck(inputValue);
      return;
    }

    saveInputState({
      key: 'email',
      inputValue,
      msg,
      flag,
    });
  };

  // const nickChangeHandler = async (e) => {
  //   const inputValue = e.target.value;
  //   let msg = '좋아요';
  //   let flag = true;
  //   saveInputState({ key: 'nick', inputValue, msg, flag });
  // };

  const nickChangeHandler = async (e) => {
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
    const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '닉네임은 필수값 입니다.';
    } else if (!nickRegex.test(inputValue)) {
      msg = '2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 조합해주세요';
    } else {
      await nickFetchDuplicateCheck(inputValue);
      return;
    }

    saveInputState({
      key: 'nickname',
      inputValue,
      msg,
      flag,
    });
  };

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
        saveInputState({ key: 'nickname', inputValue: nickname, msg, flag });
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
    const inputValue = e.target.value;

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

    saveInputState({ key: 'password', inputValue, msg, flag });
  };

  const pwCheckHandler = (e) => {
    let msg;
    let flag = false;

    if (!e.target.value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== e.target.value) {
      msg = '입력한 비밀번호와 다릅니다.';
    } else {
      msg = '비밀번호가 일치합니다.';
      flag = true;
    }

    saveInputState({
      key: 'passwordCheck',
      inputValue: 'pass',
      msg,
      flag,
    });
  };

  // 핸드폰 번호
  /*
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneNumberHandler = (e) => {
    const phoneNumberRegex = /(01[016789{1}])-([0-9]{4})-([0-9]{4})$/;
    const inputValue = e.target.value;
    let filterPhoneNumber = '';

    let msg;
    let flag = false;
    filterPhoneNumber = inputValue
      .replace(/[^0-9.]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    console.log(filterPhoneNumber);
    setPhoneNumber(filterPhoneNumber);

    if (!phoneNumberRegex.test(inputValue)) {
      msg = '휴대폰 번호를 다시 확인해주세요.';
    } else {
      flag = true;
    }

    saveInputState({
      key: 'phoneNumber',
      inputValue,
      msg,
      flag,
    });

    console.log({
      key: 'phoneNumber',
      inputValue,
      msg,
      flag,
    });
  };
  // console.log(phoneNumber);

  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerOpen, setIstimerOpen] = useState(false);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // 인증하기 버튼
  const sendButtonHandler = (e) => {
    e.preventDefault();
    setIstimerOpen(true);
    setRemainingTime(10);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOpen && remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else if (isTimerOpen && remainingTime === 0) {
        clearInterval(timer);
        alert('dd');
        setIstimerOpen(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);
  //------------------------------------------------------
  */

  const [regionName, setRegionName] = useState('');
  // 내 위치 자동설정
  // let regionName = null;

  async function getAddr(lat, lng) {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = await function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result);
        const area = result[0].address.region_1depth_name;
        console.log(area);

        saveInputState({
          key: 'regionName',
          inputValue: area,
          msg: '지역 설정 완료',
          flag: true,
        });
      }
      //
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          //getAddr(위도, 경도);
          getAddr(position.coords.latitude, position.coords.longitude);
          console.log(position);
        },
        function (error) {
          console.error(error);
          alert('위치 조회를 차단하셨습니다! 차단 풀어주세요~');
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('현재 브라우저에서는 geolocation를 지원하지 않습니다');
    }
  }

  const addressClickHandler = () => {
    getLocation();

    // let msg;
    // let flag = false;

    // console.log(regionName);
    // if (!regionName) {
    //   msg = '지역설정은 필수값 입니다.';

    //   saveInputState({
    //     key: 'regionName',
    //     inputValue: regionName,
    //     msg,
    //     flag,
    //   });
    // } else {
    //   flag = true;
    //   saveInputState({
    //     key: 'regionName',
    //     inputValue: regionName,
    //     msg,
    //     flag,
    //   });
    // }
  };

  const isValid = () => {
    console.log('correct:', correct);
    for (let key in correct) {
      console.log(key);
      const flag = correct[key];
      console.log(flag);
      if (!flag) return false;
    }
    return true;
  };

  // 프로필 이미지 등록하기
  const $fileTag = useRef();

  const [imgFile, setImgFile] = useState(null);
  const showThumbnailHandler = (e) => {
    const file = $fileTag.current.files[0];

    console.log(`file: ${file}`);
    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();

    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jpeg' &&
      fileExt !== 'gif'
    ) {
      alert('이미지 파일(jpg, png, jpeg, gif)만 등록이 가능합니다.');

      $fileTag.current.value = '';
      return;
    }

    if (!$fileTag.current.files[0]) {
      setImgFile(require('../../assets/img/anonymous.jpg'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(`reader.result: ${reader.result}`);
      setImgFile(reader.result);
    };
  };

  // 키워드 등록하기
  // 입력한 키워드를 저장하는 배열
  const [keywords, setKeywords] = useState([]);
  console.log(typeof keywords);
  // const [keyword, setKeyword] = useState({ id: '', value: '' });

  const handleKeyDown = (value) => {
    console.log(value);

    for (const keyword of keywords) {
      if (keyword.value === value) {
        alert('이미 존재하는 키워드입니다.');
        return;
      }
    }

    setKeywords((currentKeywords) => {
      return [
        ...currentKeywords,
        {
          id: keywords.length < 1 ? 1 : keywords[keywords.length - 1].id + 1,
          value,
        },
      ];
    });

    // setKeywords((oldValue) => [...oldValue, { id: keyword.id, value }]);
    document.getElementById('keyword').value = '';
  };

  // console.log(keywords.length);
  // console.log([...keywords]);

  const deleteHandler = (e) => {
    // console.log(`e.target.textContent: ${e.target.textContent}`);
    // console.log(`typeof e.target.textContent ${typeof e.target.textContent}`);
    const value = e.target.textContent;
    setKeywords((oldKeywords) => {
      const updatedKeywords = oldKeywords.filter((k) => k.value !== value);
      return updatedKeywords;
    });
    // console.log(`지운 후: ${keywords}`);
  };

  const fetchSignUpPost = async () => {
    const { email, nickname, password, regionName } = userValue;
    const keywordArray = [];
    keywords.forEach((k) => keywordArray.push(k.value));

    const user = {
      email,
      nickname,
      password,
      regionName,
      favoriteKeywords: keywordArray, // JSON 문자열로 전송
    };

    const userJsonBlob = new Blob([JSON.stringify(user)], {
      type: 'application/json',
    });
    console.log(userJsonBlob);

    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    console.log('imgFile ', imgFile);
    console.log('서버에 이미지 보내기 전: ', $fileTag.current.files[0]);
    userFormData.append('profileImage', $fileTag.current.files[0]);

    const res = await fetch(API_BASE_URL + USER, {
      method: 'POST',
      body: userFormData,
    });

    if (res.status === 200) {
      console.log(`res: ${res}`); //----
      const data = await res.json();
      alert(`${data.email}님 회원가입에 성공했습니다.`);
      navigate('/login');
    } else {
      console.log(res.text());
      alert('서버와의 통신이 원활하지 않습니다.');
    }
  };

  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      fetchSignUpPost();
    } else {
      alert('입력란을 다시 확인해 주세요');
    }
  };

  console.log('userValue: ', userValue);

  const theme = createTheme({
    palette: {
      ochre: {
        button: '#FFA927',
      },
    },
    typography: {
      fontSize: 12,
    },
  });
  const { goLogin } = useNavigation();

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Container component='main' className={styles.main}>
          <Container component='div' style={{ margin: '0 auto' }}>
            <form noValidate>
              <Grid item sx={12}>
                <Typography className={styles.head}>회원가입</Typography>
              </Grid>
              <Grid container spacing={2} className={styles.contentContainer}>
                <Grid item xs={6}>
                  <Box
                    className={styles.thumbnailBox}
                    onClick={() => {
                      $fileTag.current.click();
                    }}
                  >
                    <img
                      src={
                        imgFile || require('../../assets/img/anonymous.jpg')
                      } /**/
                      alt='profile'
                      title='프로필 등록하기'
                    />
                    {/* require 앞에 imgFile 변수 넣어야 함 */}
                  </Box>
                  <label className={styles.imgLabel} htmlFor='profile-img'>
                    <FaFileImage />
                    프로필 사진 추가
                  </label>
                  <input
                    id='profile-img'
                    type='file'
                    style={{ display: 'none' }}
                    accept='image/*' /* 자사/소셜 로그인 진행시 DB에 넣을 때 경로문제 발생할 수도 있음 */
                    ref={$fileTag}
                    onChange={showThumbnailHandler}
                  />
                </Grid>
                <Grid container xs={6} spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete='fname'
                      name='email'
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='이메일 주소'
                      autoFocus
                      onChange={emailHandler}
                    />
                    <span
                      id='check-span'
                      style={
                        correct.email ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.email}
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='nickname'
                      label='닉네임'
                      type='text'
                      id='nickname'
                      autoComplete='nickname'
                      onChange={nickChangeHandler}
                    />
                    <span
                      id='check-span'
                      style={
                        correct.nickname ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.nickname}
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='패스워드'
                      autoComplete='current-password'
                      onChange={passwordHandler}
                    />
                    <span
                      id='check-span'
                      style={
                        correct.password ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.password}
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
                        correct.passwordCheck
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {message.passwordCheck}
                    </span>
                  </Grid>
                  <Grid item xs={12} className={styles.region}>
                    <Grid item xs={7}>
                      <TextField
                        fullWidth
                        id='regionName'
                        name='regionName'
                        inputProps={{ readOnly: true }}
                        value={userValue.regionName}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Button
                        type='button'
                        sx={{ height: '100%' }}
                        style={{ background: '#1B1511', marginLeft: '5px' }}
                        fullWidth
                        variant='contained'
                        onClick={addressClickHandler}
                        startIcon={<PinDropIcon />}
                      >
                        내 동네 설정
                      </Button>
                    </Grid>
                  </Grid>
                  <p
                    className={styles.regionCorrect}
                    id='check-span'
                    style={
                      correct.regionName ? { color: 'green' } : { color: 'red' }
                    }
                  >
                    {message.regionName}
                  </p>
                  <Grid item xs={12} className={styles.keyword}>
                    <Grid item xs={12} className={styles.keywordTitle}>
                      <Typography>
                        Tip! <br></br>
                        관심키워드를 입력하시면 뉴스레터를 받아보실 수 있습니다.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type='text'
                        placeholder='관심 키워드를 입력하고 엔터를 눌러주세요'
                        id='keyword'
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            handleKeyDown(e.target.value);
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ul style={{ display: 'flex', justifyContent: '' }}>
                      {keywords.map((keyword) => {
                        return (
                          <li
                            style={{ border: 'solid 1px black' }}
                            onClick={deleteHandler}
                            key={keyword.id}
                          >
                            {keyword.value}
                          </li>
                        );
                      })}
                    </ul>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='button'
                      fullWidth
                      variant='contained'
                      style={{ background: '#1B1511', padding: '10px' }}
                      onClick={joinButtonClickHandler}
                    >
                      회원가입
                    </Button>
                  </Grid>
                  <Grid item xs={12} className={styles.login}>
                    <Typography>이미 회원이신가요?</Typography>
                    <Typography
                      onClick={goLogin}
                      color='#053ffc'
                      marginLeft='15px'
                    >
                      로그인
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Container>
      </div>
    </ThemeProvider>
  );
};
export default Join;
