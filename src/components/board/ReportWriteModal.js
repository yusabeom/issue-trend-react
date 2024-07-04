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
  Popover,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Snackbar,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import basicImage from '../../assets/img/logo.png';
import axiosInstance from '../../config/axios-config';

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
import AuthContext from '../../components/store/auth-context';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { isLoggedIn, userEmail, onLogout, profileImage } =
    useContext(AuthContext);
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
  const [open, setOpen] = useState(false); // 모달창을 열었는지 여부
  const [imageSrc, setImageSrc] = useState(null); // 첨부한 파일 이미지
  const [openDetail, setOpenDetail] = useState(true); // 동의 항목

  const $snackbarRef = useRef(null); // 스낵바 ref

  const [titleInput, setTitleInput] = useState(
    props.type === 'edit' ? props.object.title : '',
  ); // 제목
  const [contentInput, setContentInput] = useState(
    props.type === 'edit' ? props.object.text : '',
  );
  const [checked, setChecked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [imgFile, setImgFile] = useState(null);

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
    if (!isLoggedIn) {
      console.log('로그인이 안됐어요!');
      props.setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
        props.setSnackbarOpen(false);
      }, 3000);

      return;
    }

    if (props.type === 'edit') {
      console.log('title: ', props.object.title);
      setTitleInput(props.object.title);
      setContentInput(props.object.text);
      console.log('기존에 첨부한 이미지:', props.object.img);
      setImgFile(props.object.img);
      setImageSrc(props.object.img);
    }
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
  }));

  // 첨부한 파일이 바뀔 때 이벤트 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showagreeDeatail = () => {
    setOpenDetail((prev) => !prev);
  };

  // 게시글 작성
  const handleReport = async (e) => {
    e.preventDefault();
    if (!checked) {
      setOpenAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append(
      'requestDTO',
      new Blob(
        [
          JSON.stringify({
            userNo: localStorage.getItem('USER_NO'),
            title: titleInput,
            text: contentInput,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (imgFile) {
      formData.append('img', imgFile);
    }

    // axios
    console.log('POST url: ', ARTICLE + '/create-post');
    try {
      const res = await axiosInstance.post(ARTICLE + '/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setOpen(false);
      window.location.reload();
    }
  };

  // 게시글 수정
  const handleEditReport = async (e) => {
    e.preventDefault();
    if (!checked) {
      setOpenAlert(true);
      return;
    }

    const formData = new FormData();
    const postNo = props.object.postNo;
    formData.append(
      'requestDTO',
      new Blob(
        [
          JSON.stringify({
            userNo: localStorage.getItem('USER_NO'),
            title: titleInput,
            text: contentInput,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (imgFile) {
      formData.append('newImage', imgFile);
    }

    // axios
    console.log('PUT url: ', ARTICLE + '/update-post/' + postNo);
    try {
      const res = await axiosInstance.put(
        ARTICLE + '/update-post/' + postNo,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setOpen(false);
      window.location.reload();
    }
  };

  // 작성 취소
  const handleCancelReport = () => {
    setOpen(false);
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
                    <OutlinedInput
                      placeholder='제목을 입력하세요'
                      onChange={(e) => {
                        setTitleInput(e.target.value);
                      }}
                      value={titleInput}
                    />
                    <FormHelperText />
                  </FormControl>

                  <Textarea
                    sx={{
                      marginTop: '2rem',
                      height: '300px',
                      overflow: 'auto',
                    }}
                    color='neutral'
                    disabled={false}
                    minRows={2}
                    maxRows={10}
                    placeholder='내용을 입력해주세요'
                    size='md'
                    variant='plain'
                    onChange={(e) => {
                      setContentInput(e.target.value);
                    }}
                    value={contentInput}
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
                      <VisuallyHiddenInput
                        type='file'
                        onChange={handleFileChange}
                      />
                    </Button>
                    {imageSrc && (
                      <div style={{ marginTop: '20px' }}>
                        <img
                          src={imageSrc}
                          alt='Uploaded'
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                    )}
                  </div>

                  {titleInput.trim() && contentInput.trim() && (
                    <footer>
                      <div className={styles.agreement}>
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span>
                          {' '}
                          <strong onClick={showagreeDeatail}>
                            개인정보 수집 및 이용
                          </strong>
                          에 동의합니다.
                        </span>
                      </div>
                      <div
                        className={
                          openDetail
                            ? styles.hiddenAgreeDetail
                            : styles.showAgreeDetail
                        }
                      >
                        1. 개인정보의 수집·이용 항목회사는 수집한 개인정보를
                        다음의 목적을 위해 활용합니다. [서비스 안내 및 제보
                        내용에 관한 확인 및 처리 등의 업무 진행] <br /> <br />
                        2. 수집하는 개인정보 항목이름, 전화번호, 이메일 등
                        입력항목 <br /> <br />
                        3. 개인정보의 보유 및 이용기간원칙적으로 개인정보의 수집
                        및 이용목적이 달성된 후에는 해당 정보를 지체없이
                        파기합니다.
                      </div>
                      <div className={styles.submitButton}>
                        {props.type === 'write' ? (
                          <div
                            className={styles.postButton}
                            onClick={handleReport}
                          >
                            제보하기
                          </div>
                        ) : (
                          <div className={styles.delEdit}>
                            <div
                              className={styles.delButton}
                              onClick={handleCancelReport}
                            >
                              취소
                            </div>
                            <div
                              className={styles.editButton}
                              onClick={handleEditReport}
                            >
                              수정
                            </div>
                          </div>
                        )}
                      </div>
                      {openAlert && (
                        <Alert style={{ marginTop: '1rem' }} severity='warning'>
                          동의를 해야 제보할 수 있습니다.
                        </Alert>
                      )}
                    </footer>
                  )}
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
