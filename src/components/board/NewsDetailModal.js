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
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';

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
  const [replyList, setReplyList] = useState([]); // 댓글 리스트

  const infoWrapperRef = useRef(null);

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  const bringReplies = async () => {
    // 해당 기사 댓글 불러오기
    // "/articles/{articleCode}/comments"
    console.log(
      'GET 요청 url: ',
      ARTICLE + `/articles/${article.articleCode}/comments`,
    );

    const res = await axios.get(
      ARTICLE + `/articles/${article.articleCode}/comments`,
    );

    const replies = await res.data; // 해당 기사 댓글 목록
    setReplyList(replies);
    console.log('get replylist from server : ', replyList);
  };

  const handleOpen = () => {
    setOpen(true);
    bringReplies();
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
  }));

  // 입력창에 입력해서 제출한 댓글
  const newComment = async (input) => {
    console.log(input);

    // 댓글을 서버에 전송(insert)
    // "/articles/{articleCode}/comments"
    console.log(
      'POST 요청 url: ',
      ARTICLE + `/articles/${article.articleCode}/comments`,
    );
    try {
      const res = await axios.post(
        ARTICLE + `/articles/${article.articleCode}/comments`,
        { userNo: 1, articleCode: article.articleCode, text: input },
      );
      console.log('서버 정상 동작: ', res.data);
      bringReplies();
    } catch (error) {
      console.log(error);
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
                      <li key={reply.commentNo}>
                        <p className={styles.replyWriter}>
                          <div className={styles.profile}>
                            <img
                              src={reply.replyProfile}
                              alt='댓글 작성자 프로필 사진'
                            />
                          </div>
                          {reply.userNo}
                        </p>
                        <p className={styles.replyContent}>{reply.text}</p>
                        {/* <p className={styles.replyDate}>{reply.replyDate}</p> */}
                      </li>
                    ))}
                </ul>
                <div className='replyInput'>
                  <TextareaComment newComment={newComment} />
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
