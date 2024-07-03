import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from '../../styles/ReportDetail.module.scss';
import { Button, Popover, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faEllipsisVertical,
  faPen,
  faRightToBracket,
  faStar,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import TextareaComment from '../../common/ui/TextAreaComment';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import ReportWriteModal from './ReportWriteModal';
import { style } from 'd3';
import axiosInstance from '../../config/axios-config';
import Comfirm from '../../common/ui/Confirm';
import AuthContext from '../store/auth-context';

const ARTICLE = API_BASE_URL + USER;

const ReportDetail = () => {
  const { userNo, isLoggedIn } = useContext(AuthContext);

  const [openReply, setOpenReply] = useState(false); // 댓글창 열기
  const [boardDetail, setBoardDetail] = useState({
    postNo: 0,
    userNo: 0,
    title: '',
    text: '',
    writeDate: '',
    img: '',
    email: '',
    formatDate: '',
  }); // 게시물 정보
  const [writerProfile, setWriterProfile] = useState(
    'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
  ); // 작성자 프사
  const [replyList, setReplyList] = useState([]); // 댓글 리스트
  const [imgUrl, setImgUrl] = useState(''); // 게시글 첨부 이미지
  const [selectedReply, setSelectedReply] = useState(null); // 수정할 replyNo

  // 경로 상에 붙은 변수 정보(path variable)을 가져오는 방법
  // ex) /board/detail/{data}
  const { id } = useParams();
  const confirmRef = useRef();

  // 요청과 함께 전달된 쿼리스트링을 가져오는 방법.
  // ex) /board/list?page=2&size=10
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 20;

  // 게시물 상세페이지 불러오기
  const fetchData = async () => {
    try {
      console.log('GET 요청 url: ', ARTICLE + '/search-post/' + id);
      const res = await axios.get(ARTICLE + '/search-post/' + id);
      const getBoardDetail = await res.data;

      console.log('getBoardDetail.postNo' + getBoardDetail.postNo);
      setBoardDetail({
        postNo: getBoardDetail.postNo,
        userNo: getBoardDetail.userNo,
        title: getBoardDetail.title,
        text: getBoardDetail.text,
        writeDate: getBoardDetail.writeDate,
        img: getBoardDetail.img,
        email: getBoardDetail.email,
        formatDate: getBoardDetail.formatDate,
      });
    } catch (error) {
      // console.error('Error fetching data: ', error);
      console.error(error);
    }
  };

  // 게시물 이미지 불러오기
  const fetchImage = async () => {
    try {
      console.log('GET 요청 url: ', ARTICLE + '/load-image/' + id);
      const res = await axios.get(ARTICLE + '/load-image/' + id);
      const getBoardImg = await res.data;

      setImgUrl(getBoardImg);
      // console.log('imgUrl: ', imgUrl);
    } catch (error) {
      // console.error('Error fetching data: ', error);
      console.log(error);
      setImgUrl('');
    }
  };

  // 해당 게시글 댓글 불러오기
  const bringReplies = () => {
    const fetchRepliesData = async () => {
      // "/articles/{postNo}/comments"
      console.log('GET 요청 url: ', ARTICLE + `/post/${id}/comments`);

      const res = await axios.get(ARTICLE + `/post/${id}/comments`);

      const replies = await res.data; // 해당 기사 댓글 목록
      setReplyList(replies);
      console.log('get replylist from server : ', replies);
    };
    fetchRepliesData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('postNo is ', boardDetail.postNo);
    fetchImage();
    bringReplies();
    // console.log('postNo is ', boardDetail.postNo);
  }, [boardDetail]);

  // 댓글 리스트 열기
  const handleClickReply = () => {
    setOpenReply(!openReply);
  };

  // 입력창에 입력해서 제출한 댓글 작성하기
  const newComment = async (input) => {
    console.log(input);

    // 댓글을 서버에 전송(insert)
    // "/post/{postNo}/comments"
    console.log(
      'POST 요청 url: ',
      ARTICLE + `/post/${boardDetail.postNo}/comments`,
    );
    try {
      const res = await axiosInstance.post(
        ARTICLE + `/post/${boardDetail.postNo}/comments`,
        {
          userNo: localStorage.getItem('USER_NO'),
          postNo: boardDetail.postNo,
          text: input,
        },
      );
      console.log('서버 정상 동작: ', res.data);
      bringReplies();
    } catch (error) {
      console.log(error);
    }
  };

  // 수정 모달창 열기
  const childButtonRef = useRef(null);
  const openModifyModal = () => {
    childButtonRef.current.handleOpen();
  };

  // 삭제 처리하기
  const deleteRequest = async () => {
    if (confirmRef.current) confirmRef.current.callSubmit();
  };

  // 삭제 확인 메세지
  const onConfirm = async (isDelete) => {
    console.log('isDelete:', isDelete);
    if (!isDelete) return;

    console.log('DELETE 요청 url: ', ARTICLE + `/delete-post/${id}`);
    try {
      const res = await axiosInstance.delete(ARTICLE + `/delete-post/${id}`);
      console.log('서버 정상 동작: ', res.data);
      navigate('/board');
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 수정하기
  const modifyComment = async (e, replyNo) => {
    setSelectedReply(replyNo);
  };

  const newEditComment = async (editComment) => {
    console.log('userNo:', userNo);
    console.log('postNo:', id);
    console.log('text:', editComment);
    try {
      console.log(
        'PUT 요청 url: ',
        ARTICLE + `/post/${id}/comments/${selectedReply}`,
      );
      const res = await axiosInstance.put(
        ARTICLE + `/post/${id}/comments/${selectedReply}`,
        { userNo, text: editComment, postNo: selectedReply },
      );
      console.log(res.data);
    } catch (error) {
      console.log('댓글수정 에러:', error);
    }
    setSelectedReply(null);
    bringReplies();
  };

  // 수정 취소하기
  const onCancel = (isCancel) => {
    if (isCancel) setSelectedReply(null);
  };

  // 댓글 삭제하기
  const deleteComment = async (e, replyNo) => {
    try {
      console.log(
        'DELETE 요청 url: ',
        ARTICLE + `/post/${id}/comments/${replyNo}`,
      );
      const res = await axiosInstance.delete(
        ARTICLE + `/post/${id}/comments/${replyNo}`,
      );
    } catch (error) {
      console.log('댓글삭제 에러:', error);
    }
    bringReplies();
  };

  return (
    <div className={styles.outWrapper}>
      <div className={`aspect-ratio ${styles.wrapper}`}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/board');
          }}
        >
          제보 게시판
        </h2>
        {boardDetail && (
          <div className={styles.board}>
            <header className='boardHeader'>
              <div>
                <p className={styles.title}>{boardDetail.title}</p>
              </div>

              <div>
                <div className={styles.writer}>
                  <div className={styles.profile}>
                    <img src={writerProfile} alt='작성자 프로필 사진' />
                  </div>
                  {boardDetail.email}
                </div>
                <div>
                  <p>{boardDetail.formatDate}</p>
                </div>
              </div>
            </header>

            <hr />

            <main className='contentRegion'>
              {imgUrl && (
                <div className={styles.boardImg}>
                  <img src={imgUrl} alt='게시물 이미지' />
                </div>
              )}
              <p className={styles.content}>{boardDetail.text}</p>
              {/* <div className={styles.boardTags}>
              <div className={styles.tag}>#범죄</div>
              <div className={styles.tag}>#제보</div>
              <div className={styles.tag}>#경찰</div>
            </div> */}
            </main>

            <hr />

            <footer className='replyRegion'>
              <Button onClick={handleClickReply}>
                댓글 &nbsp;
                {openReply ? (
                  <FontAwesomeIcon icon={faCaretUp} size='1x' />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} size='1x' />
                )}{' '}
                &nbsp; | {replyList.length}
              </Button>
              {+localStorage.getItem('USER_NO') === +boardDetail.userNo && (
                <div className={styles.crud}>
                  <Button variant='outlined' onClick={openModifyModal}>
                    수정
                  </Button>
                  <Button variant='outlined' onClick={deleteRequest}>
                    삭제
                  </Button>
                </div>
              )}
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/board');
                }}
                style={{ float: 'right' }}
              >
                목록
              </Button>
            </footer>
            <Comfirm onConfirm={onConfirm} ref={confirmRef} />
          </div>
        )}

        {/* 댓글 영역 */}
        {openReply && (
          <div className={styles.reply}>
            <ul className={styles.replyList}>
              {replyList &&
                replyList.map((reply) => (
                  <li key={reply.commentNo}>
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
                      {reply.email}
                    </div>
                    <div className={styles.replyContent}>
                      <p>{reply.text}</p>

                      {+reply.userNo === +userNo && (
                        <p className={styles.moddel}>
                          <FontAwesomeIcon
                            icon={faPen}
                            className={styles.icon}
                            onClick={(e) => modifyComment(e, reply.commentNo)}
                          />
                          &nbsp;&nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.icon}
                            onClick={(e) => deleteComment(e, reply.commentNo)}
                          />
                        </p>
                      )}
                    </div>

                    {selectedReply === reply.commentNo && (
                      <TextareaComment
                        newComment={newEditComment}
                        initialValue={reply.text}
                        type={'modify'}
                        onCancel={onCancel}
                      />
                    )}

                    {/* <p className={styles.replyDate}>{reply.replyDate}</p> */}
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
          </div>
        )}

        <div style={{ display: 'none' }}>
          <ReportWriteModal
            ref={childButtonRef}
            type={'edit'}
            object={boardDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
