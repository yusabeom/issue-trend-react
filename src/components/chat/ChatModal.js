import React, { useEffect, useState } from 'react';
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

const ChatModal = () => {
  const { headerStyle, chatContents, profile } = styles;

  const [open, setOpen] = useState(false); // 채팅 모달창을 열었는지 여부
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // 유저 정보창 렌더링 여부
  const [clickedUserName, setClickedUserName] = useState(''); // 클릭한 유저 이름

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUserName = (name) => {
    console.log(name);
    setIsUserInfoVisible(true);
    setClickedUserName(name);
  };

  // 유저 이름을 클릭할 때마다, 유저 창 애니메이션 부여
  useEffect(() => {}, [clickedUserName]);

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
            <div className={styles.infoWrapper}>
              {isUserInfoVisible && <UserInfo userName={clickedUserName} />}
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default ChatModal;
