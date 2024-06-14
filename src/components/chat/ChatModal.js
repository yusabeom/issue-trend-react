import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal, Box, Button, Slide, Backdrop } from '@mui/material';
import Chat from './Chat';
import styles from './ChatModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import UserInfo from './UserInfo';
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

  const [open, setOpen] = useState(false); // 채팅 모달창을 열었는지 여부
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // 유저 정보창 렌더링 여부
  const [clickedUserName, setClickedUserName] = useState(''); // 클릭한 유저 이름
  const [animate, setAnimate] = useState(false); // 유저 정보창 애니메이션
  const infoWrapperRef = useRef(null);

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  const handleOpen = () => setOpen(true);

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
                서울 구로구{'    '}
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faX}
                  size='xs'
                  onClick={handleClose}
                />
              </h2>

              <div className={chatContents}>
                <Chat />
                <Profile clickName={getUserName} />
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
    </div>
  );
});

ChatModal.displayName = 'ChatModal';
export default ChatModal;
