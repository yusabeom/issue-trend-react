import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal, Box, Button, Slide, Backdrop } from '@mui/material';

import styles from '../../styles/NewsDetailModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faX } from '@fortawesome/free-solid-svg-icons';
import { height } from '@mui/system';

// 모달 안에 넣을 컴포넌트

const boxStyle = {
  position: 'absolute',
  height: '90%',
  top: '5%',
  left: '20%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
  overflow: 'auto',
};

const NewsDetailModal = forwardRef((props, ref) => {
  const article = props.article;
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
  } = styles;
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
    console.log('article: ', article);
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

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
                뉴스 기사{'    '}
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faX}
                  size='xs'
                  onClick={handleClose}
                />
              </h2>
              <div className={articleContents}>
                <h2>{article.title}</h2>

                <p className={dateTime}>{article.createdDate}</p>
                <div className={imgContainer}>
                  <img src={article.img} alt='기사 이미지' />
                </div>
                <p className={text}>{article.text}</p>
                <hr />
                <div className={source}>
                  <p className={newsAgency}>{article.newsAgency}</p>
                  <p className={writer}>{article.writer}</p>
                </div>
                <a href={article.articleLink}>
                  {' '}
                  <FontAwesomeIcon icon={faLink} />
                  뉴스 보러 가기
                </a>
              </div>
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
});

NewsDetailModal.displayName = 'NewsDetailModal';
export default NewsDetailModal;
