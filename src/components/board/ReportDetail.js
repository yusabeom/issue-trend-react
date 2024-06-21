import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from '../../styles/ReportDetail.module.scss';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import TextareaComment from '../../common/ui/TextAreaComment';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';

const ARTICLE = API_BASE_URL + USER;

const ReportDetail = () => {
  const [openReply, setOpenReply] = useState(false); // 댓글창 열기
  const [boardDetail, setBoardDetail] = useState(null); // 게시물 정보
  const [writerProfile, setWriterProfile] = useState(
    'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
  ); // 작성자 프사
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

  // 경로 상에 붙은 변수 정보(path variable)을 가져오는 방법
  // ex) /board/detail/{data}
  const { id } = useParams();

  // 요청과 함께 전달된 쿼리스트링을 가져오는 방법.
  // ex) /board/list?page=2&size=10
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 20;

  useEffect(() => {
    /*
    // (path variabled인 id에 따라) 서버로부터 게시물 데이터 가져오기
    // 게시물 정보의 writer 정보도 같이 (프사를 위해)
    // 게시물 정보의 reply 정보도 같이 (댓글 정보)
    // fetch가 정상적으로 이루어지면 loading을 false로
    const res = await axios.get(REPORT_DETAIL_URL, { id });

    const getBoardDetail = await res.data; // 게시물 데이터
    */

    const fetchData = async () => {
      try {
        console.log('GET 요청 url: ', ARTICLE + '/search-post/' + id);
        const res = await axios.get(ARTICLE + '/search-post/' + id);
        const getBoardDetail = await res.data;

        setBoardDetail(getBoardDetail);
      } catch (error) {
        // console.error('Error fetching data: ', error);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('boardDetail: ', boardDetail);
  }, [boardDetail]);

  const handleClickReply = () => {
    setOpenReply(!openReply);
  };

  return (
    <div className={`aspect-ratio ${styles.wrapper}`}>
      <h2>제보 게시판</h2>
      {boardDetail && (
        <div className={styles.board}>
          <header className='boardHeader'>
            <div>
              <p className={styles.title}>{boardDetail.title}</p>
              <Button variant='outlined'>
                <FontAwesomeIcon icon={faStar} />
                &nbsp;스크랩
              </Button>
            </div>

            <div>
              <p className={styles.writer}>
                <div className={styles.profile}>
                  <img src={writerProfile} alt='작성자 프로필 사진' />
                </div>
                {boardDetail.email}
              </p>
              <div>
                <a href=''>신고하기</a>
                <p>{boardDetail.formatDate}</p>
              </div>
            </div>
          </header>

          <hr />

          <main className='contentRegion'>
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
            <div className={styles.crud}>
              <Button variant='outlined'>수정</Button>
              <Button variant='outlined'>삭제</Button>
            </div>
          </footer>
        </div>
      )}

      {openReply && (
        <div className={styles.reply}>
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
                  <p className={styles.replyContent}>{reply.replyContent}</p>
                  <p className={styles.replyDate}>{reply.replyDate}</p>
                </li>
              ))}
          </ul>
          <div className='replyInput'>
            <TextareaComment />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetail;
