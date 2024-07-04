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
} from '@mui/material';
import basicImage from '../../assets/img/logo.png';

import styles from '../../styles/NewsDetailModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faEllipsisVertical,
  faLink,
  faRightToBracket,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { height } from '@mui/system';
import TextareaComment from '../../common/ui/TextAreaComment';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import ScrapBtn from '../../common/ui/ScrapBtn';
import axiosInstance from '../../config/axios-config';
import AuthContext from '../store/auth-context';
import MyPageContext from '../../utils/MyPageContext';

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

const NewsDetailModal = forwardRef(({ article }, ref) => {
  const { isLoggedIn, userEmail, regionName, onLogout, userNo } =
    useContext(AuthContext);

  const { recentInquiry, setRecentInquiry } = useContext(MyPageContext); // 가장 최근에 본 뉴스 기사 (번호)

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

  // Profile.js의 특정 user의 이름을 onClick하면 그 user의 이름 정보를 부모 컴포넌트인 ChatModal로 전달
  // 이름과 함께 UserInfo.js를 display 하면서 그 자식 컴포넌트에게 이름을 전달

  const bringReplies = async () => {
    // 해당 기사 댓글 불러오기
    // "/articles/{articleCode}/comments"
    console.log(
      'GET 요청 url: ',
      ARTICLE + `/articles/${article.articleCode}/comments`,
    );

    const res = await axiosInstance.get(
      ARTICLE + `/articles/${article.articleCode}/comments`,
    );

    const replies = await res.data; // 해당 기사 댓글 목록
    setReplyList(replies);
    console.log('get replylist from server : ', replies);
  };

  const handleOpen = () => {
    setOpen(true);
    bringReplies();

    // 최근에 본 뉴스 기사 갱신
    setRecentInquiry((prev) => {
      if (recentInquiry.length >= 10) {
        const newArr = [...prev];
        newArr.shift(); // 첫 번째 요소 제거
        newArr.push(article.articleCode); // 마지막에 새로운 요소 추가
        return newArr;
      } else {
        return [...prev, article.articleCode];
      }
    });
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
  }));

  // 입력창에 입력해서 제출한 댓글 작성하기
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
        { userNo, articleCode: article.articleCode, text: input },
      );
      console.log('서버 정상 동작: ', res.data);
      bringReplies();
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 수정하기
  const handleModify = (replyNo) => {
    setEditingCommentId(replyNo);
  };

  const newEditComment = async (editComment) => {
    console.log(
      'PUT 요청 url: ',
      ARTICLE + `/articles/${article.articleCode}/comments/${editingCommentId}`,
    );
    console.log('수정 text: ', editComment);

    try {
      const res = await axiosInstance.put(
        ARTICLE +
          `/articles/${article.articleCode}/comments/${editingCommentId}`,
        { text: editComment },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditingCommentId(null);
      setAnchorEl(null);
      bringReplies();
    }
  };

  const onCancel = (isCancel) => {
    if (isCancel) setEditingCommentId(null);
  };

  // 댓글 삭제하기
  const handleDelete = async (replyNo) => {
    console.log(
      'DELETE 요청 url: ',
      ARTICLE + `/articles/${article.articleCode}/comments/${replyNo}`,
    );
    try {
      const res = await axiosInstance.delete(
        ARTICLE + `/articles/${article.articleCode}/comments/${replyNo}`,
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditingCommentId(null);
      setAnchorEl(null);
      bringReplies();
    }
  };

  // Popover 이벤트 핸들러
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedReply(null);
  };

  const handleClick = (event, replyNo) => {
    setAnchorEl(event.currentTarget);
    setSelectedReply(replyNo);
  };

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;

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
                {localStorage.getItem('USER_NO') && (
                  <ScrapBtn articleCode={article.articleCode} />
                )}
              </div>
              <footer className={styles.reply}>
                <h3>댓글 {replyList.length}</h3>
                <ul className={styles.replyList}>
                  {replyList.length > 0 &&
                    replyList.map((reply) => (
                      <li key={reply.commentNo}>
                        <div
                          className={styles.commentHeader}
                          value={reply.commentNo}
                        >
                          <div className={styles.replyWriter}>
                            <div className={styles.profile}>
                              <img
                                src={
                                  reply.profileImage ||
                                  require('../../assets/img/anonymous.jpg')
                                }
                                alt='댓글 작성자 프로필 사진'
                              />
                            </div>
                            <div className={styles.email}>{reply.email}</div>
                          </div>

                          {+reply.userNo === +userNo && (
                            <div className={styles.crud}>
                              <FontAwesomeIcon
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => handleClick(e, reply.commentNo)}
                                icon={faEllipsisVertical}
                              />
                            </div>
                          )}

                          <Popover
                            id={id}
                            open={openPopOver}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                          >
                            <Typography sx={{ p: 2 }}>
                              <Button
                                onClick={() => handleModify(selectedReply)}
                                value={reply.commentNo}
                              >
                                수정
                              </Button>
                              <Button
                                onClick={() => handleDelete(selectedReply)}
                                value={reply.commentNo}
                              >
                                삭제
                              </Button>
                            </Typography>
                          </Popover>
                        </div>

                        <p className={styles.replyContent}>{reply.text}</p>
                        {/* 수정 영역 */}
                        {editingCommentId === reply.commentNo && (
                          <TextareaComment
                            newComment={newEditComment}
                            initialValue={reply.text}
                            type={'modify'}
                            onCancel={onCancel}
                          />
                        )}
                      </li>
                    ))}
                </ul>
                {isLoggedIn ? (
                  <div className='replyInput'>
                    <TextareaComment newComment={newComment} type={'insert'} />
                  </div>
                ) : (
                  <div className={styles.notLoggedInMesage}>
                    <p>댓글은 로그인 후 작성할 수 있습니다</p>
                    <a href='/login'>
                      <FontAwesomeIcon icon={faRightToBracket} />
                      &nbsp; 로그인하기
                    </a>
                  </div>
                )}
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
