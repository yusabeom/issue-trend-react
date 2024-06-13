import React, { useState } from 'react';
import { Modal, Box, Button, Slide, Backdrop } from '@mui/material';
import Chat from './Chat';
import styles from './ChatModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
// 모달 안에 넣을 컴포넌트

const boxStyle = {
  position: 'absolute',
  top: '10%',
  left: '30%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const ModalComponent = () => {
  const { headerStyle, chatContents, profile } = styles;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Profile />
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default ModalComponent;
