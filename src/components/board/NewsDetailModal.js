import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal, Box, Button, Slide, Backdrop } from '@mui/material';
import basicImage from '../../assets/img/logo.png';

import styles from '../../styles/NewsDetailModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faX } from '@fortawesome/free-solid-svg-icons';
import { height } from '@mui/system';
import TextareaComment from '../../common/ui/TextAreaComment';

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
    reply,
  } = styles;
  const [open, setOpen] = useState(false); // 채팅 모달창을 열었는지 여부
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // 유저 정보창 렌더링 여부
  const [clickedUserName, setClickedUserName] = useState(''); // 클릭한 유저 이름
  const [animate, setAnimate] = useState(false); // 유저 정보창 애니메이션
  const [replyList, setReplyList] = useState([
    {
      no: '1',
      replyProfile:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      replyWriter: '짱구',
      replyContent: '좋은 정보 감사합니다~',
      replyDate: '2024-06-16 20:25',
    },
    {
      no: '2',
      replyProfile:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      replyWriter: '아웃사이더',
      replyContent: '그렇군요',
      replyDate: '2024-06-16 20:21',
    },
  ]); // 댓글 리스트

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

                <p className={dateTime}>{article.formattedCreatedDate}</p>
                <div className={imgContainer}>
                  {article.img !== '이미지를 찾을 수 없습니다' && (
                    <img src={article.img} alt='기사 이미지' />
                  )}
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
              <footer className={reply}>
                <ul className={styles.replyList}>
                  {replyList &&
                    replyList.map((reply) => (
                      <li key={reply.no}>
                        <p className={styles.replyWriter}>
                          <div className={styles.profile}>
                            <img
                              src={reply.replyProfile}
                              alt='댓글 작성자 프로필 사진'
                            />
                          </div>
                          {reply.replyWriter}
                        </p>
                        <p className={styles.replyContent}>
                          {reply.replyContent}
                        </p>
                        <p className={styles.replyDate}>{reply.replyDate}</p>
                      </li>
                    ))}
                </ul>
                <div className='replyInput'>
                  <TextareaComment />
                </div>
              </footer>
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
});

NewsDetailModal.displayName = 'NewsDetailModal';
export default NewsDetailModal;
