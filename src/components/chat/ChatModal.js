import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal, Box, Button, Slide, Backdrop, Snackbar } from '@mui/material';
import Chat from './Chat';
import styles from './ChatModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import UserInfo from './UserInfo';
import AuthContext from '../../components/store/auth-context';

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

  // snackBar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  // snackBar 열기

  const handleOpen = () => {
    // console.log('로그인 했나요?', isLoggedIn);
    if (!isLoggedIn) {
      console.log('로그인 안했어요');
      setSnackbarOpen(true);
      return;
    }
    setOpen(true);
  };

  // const handleSnackbarClose = () => {
  //   setState({ ...state, snackbarOpen: false });
  // };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
    setIsUserInfoVisible(false); // 유저 정보창도 닫기
    setClickedUserName('');
  };

  // 유저 정보창 닫기
  const handleOutsideClick = (e) => {
    if (infoWrapperRef.current && !infoWrapperRef.current.contains(e.target)) {
      setIsUserInfoVisible(false);
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
                <Chat onUsers={onUsers} />
                <Profile clickName={getUserName} users={userList} />
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        message='I love snacks'
        key={'top' + 'center'}
        sx={{ zIndex: '100' }}
      />
    </div>
  );
});

ChatModal.displayName = 'ChatModal';
export default ChatModal;
