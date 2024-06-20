import React, {
  forwardRef,
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
  Popover,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import basicImage from '../../assets/img/logo.png';

import styles from '../../styles/ReportWriteModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUpload,
  faEllipsisVertical,
  faLink,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { borderRadius, height, styled } from '@mui/system';
import TextareaComment from '../../common/ui/TextAreaComment';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import { Textarea } from '@mui/joy';

const ARTICLE = API_BASE_URL + USER;

// 모달 안에 넣을 컴포넌트

const boxStyle = {
  position: 'absolute',
  height: '90%',
  top: '5%',
  left: '30%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
  //   overflow: 'auto',
  borderRadius: '20px',
};

const ReportWriteModal = forwardRef((props, ref) => {
  const {
    headerStyle,
    articleContents,
    dateTime,
    text,
    imgContainer,
    newsAgency,
    writer,
    articleLink,
    source,
    reply,
  } = styles;
  const [open, setOpen] = useState(false); // 채팅 모달창을 열었는지 여부
  const [replyList, setReplyList] = useState([]); // 댓글 리스트
  const [anchorEl, setAnchorEl] = useState(null); // Popover 여부
  const [selectedReply, setSelectedReply] = useState(null); // popover에서 선택한 replyNo
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정하려는 댓글 id
  const [newModifyingText, setNewModifyingText] = useState('');

  const infoWrapperRef = useRef(null);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  const handleOpen = () => {
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
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
              <header id='modal-title' className={headerStyle}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faX}
                  size='lg'
                  onClick={handleClose}
                  color='#000'
                />
              </header>
              <main>
                <form noValidate autoComplete='off'>
                  <FormControl sx={{ width: '35ch', fontSize: '30px' }}>
                    <OutlinedInput placeholder='제목을 입력하세요' />
                    <FormHelperText />
                  </FormControl>

                  <Textarea
                    sx={{ marginTop: '2rem', height: '200px' }}
                    color='neutral'
                    disabled={false}
                    minRows={2}
                    placeholder='내용을 입력해주세요'
                    size='md'
                    variant='plain'
                  />

                  <div className={styles.uploadFile}>
                    <Button
                      component='label'
                      role={undefined}
                      variant='contained'
                      tabIndex={-1}
                      startIcon={<FontAwesomeIcon icon={faCloudUpload} />}
                    >
                      Upload file
                      <VisuallyHiddenInput type='file' />
                    </Button>
                  </div>

                  <div className={styles.submitButton}>
                    <Button> 제보하기 </Button>
                  </div>
                </form>
              </main>
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
});

ReportWriteModal.displayName = 'ReportWriteModal';
export default ReportWriteModal;
