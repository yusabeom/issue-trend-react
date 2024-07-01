import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  Box,
  Button,
  Slide,
  Backdrop,
  Snackbar,
  Alert,
} from '@mui/material';
import Chat from './Chat';
import styles from './ChatModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import UserInfo from './UserInfo';
import AuthContext from '../../components/store/auth-context';
import { useNavigate } from 'react-router-dom';

// 모달 안에 넣을 컴포넌트

const boxStyle = {
  position: 'absolute',
  top: '10%',
  left: '20%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
};

const ChatModal = forwardRef((props, ref) => {
  const { headerStyle, chatContents, profile } = styles;
  const { isLoggedIn, userEmail, regionName, onLogout } =
    useContext(AuthContext);

  const [open, setOpen] = useState(false); // 채팅 모달창을 열었는지 여부
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // 유저 정보창 렌더링 여부
  const [clickedUserName, setClickedUserName] = useState(''); // 클릭한 유저 이름
  const [animate, setAnimate] = useState(false); // 유저 정보창 애니메이션
  const infoWrapperRef = useRef(null);
  const [userList, setUserList] = useState([]); // 서버로부터 받은 채팅방 유저 목록
  const [enterTransfer, setEnterTransfer] = useState(false); // 입장하면 Profile에게 전달
  const [ExitChat, setExitChat] = useState(true); // 채팅방 나가기

  // snackBar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  // snackBar 열기
  const navigate = useNavigate();

  const handleOpen = () => {
    // console.log('로그인 했나요?', isLoggedIn);
    if (!isLoggedIn) {
      console.log('로그인 안했어요');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      return;
    }
    setOpen(true);
    setExitChat(false);
  };

  // const handleSnackbarClose = () => {
  //   setState({ ...state, snackbarOpen: false });
  // };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
    setIsUserInfoVisible(false); // 유저 정보창도 닫기
    setClickedUserName('');
    setExitChat(true);
  };

  // 유저 정보창 닫기
  const handleOutsideClick = (e) => {
    if (infoWrapperRef.current && !infoWrapperRef.current.contains(e.target)) {
      setIsUserInfoVisible(false);
      setEnterTransfer(false); // 채팅 입장 여부 false
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    console.log('지역: ', regionName);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 유저 이름 클릭 시
  const getUserName = (name) => {
    console.log(name);
    setIsUserInfoVisible(true); // 유저 정보창 열기
    setClickedUserName(name);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
  }));

  const onUsers = (usersInRoom) => {
    console.log('In ChatModal, usersInRoom is ', usersInRoom);
    setUserList(usersInRoom);
    setEnterTransfer(true);
  };

  // 채팅방에 입장했을 때 이벤트
  const onEnter = (isEnter) => {
    if (isEnter) {
      console.log('on enter!!');
      setEnterTransfer(true);
    }
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='up' in={open} mountOnEnter unmountOnExit>
          <Box sx={boxStyle}>
            <div className={styles.chatWrapper}>
              <h2 id='modal-title' className={headerStyle}>
                {localStorage.getItem('REGION_NAME')}
                {'    '}
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faX}
                  size='xs'
                  onClick={handleClose}
                />
              </h2>

              <div className={chatContents}>
                <Chat onUsers={onUsers} onEnter={onEnter} OnExit={ExitChat} />
                <Profile
                  clickName={getUserName}
                  users={userList}
                  enterTransfer={enterTransfer}
                />
              </div>
            </div>

            {isUserInfoVisible && (
              <div
                className={`${styles.infoWrapper} ${animate ? styles.fadeIn : ''}`}
              >
                <UserInfo userName={clickedUserName} openAnimate={animate} />
              </div>
            )}
          </Box>
        </Slide>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity='error'
          sx={{ width: '100%' }}
        >
          로그인 후에 이용할 수 있습니다
        </Alert>
      </Snackbar>
    </div>
  );
});

ChatModal.displayName = 'ChatModal';
export default ChatModal;
