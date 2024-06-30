import './Chat.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/iologo.png';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../components/store/auth-context';

// const webSocket = io('http://localhost:5000');
const roomSocket = io('http://192.168.0.27:5000');

// 화면에는 유저 이름(userName)을 보여주고, 서버에서는 socket.id로 식별한다.
const Chat = ({ onUsers, onEnter }) => {
  // AuthContext에서 로그인 상태를 가져옵니다.
  const { isLoggedIn, userEmail, regionName, onLogout, nickname } =
    useContext(AuthContext);

  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState(''); // 유저가 보낼 아이디 (로그인)
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [msg, setMsg] = useState(''); // 유저가 보낼 메세지
  const [msgList, setMsgList] = useState([]); // 서버로부터 받은 메세지들

  const [privateTarget, setPrivateTarget] = useState(''); // 1:1 대화 상대 아이디
  const [newMessages, setNewMessages] = useState([]); // 새 메세지
  const [roomNumber, setRoomNumber] = useState(regionName); // 선택한 방 번호
  const [passNoHistoryStop, setPassNoHistoryStop] = useState(false); // 이 값이 true면 통과

  /* ================ 1. useEffect : 최초 렌더링 시 발생하는 이벤트 (서버로부터 리시브) ================ */
  // 이벤트 리스너 (from server) : sMessage - 서버로부터 받은 메세지
  useEffect(() => {
    if (!roomSocket) return;

    console.log('첫번째 useEffect 실행!', userEmail);

    // 메세지를 서버로부터 수신
    function sMessageCallback(msg) {
      const { data, id, target } = msg; // target : 1:1 채팅 여부
      setMsgList((prev) => [
        // 메세지 리스트에 welcome 인사 추가
        ...prev,
        {
          msg: data,
          type: target ? 'private' : 'other', // target에 따른 스타일 적용
          id,
        },
      ]);
    }

    // 메세지 수신
    roomSocket.on('sMessage', sMessageCallback);
    return () => {
      // useEffect 이벤트 리스너 해제
      roomSocket.off('sMessage', sMessageCallback);
    };
  }, []);

  // 1. 로그인을 할 때 아이디를 받기 : sLogin - 아이디
  useEffect(() => {
    if (!roomSocket) return;
    // 메세지 히스토리가 없고 원래 없는 것이 아니라면(DB에는 존재) 중지
    if (msgList.length === 0) return;

    console.log('입장 메세지 useEffect!!');
    function sLoginCallback(id) {
      console.log('sLoginCallback 실행!', id);

      // console.log(userId);
      // setTimeout(() => {
      setMsgList((prev) => [
        ...prev,
        {
          msg: `${id} 님이 입장하셨습니다.`,
          type: 'welcome',
          id: '',
        },
      ]);
      // }, 500);
    }

    roomSocket.on('sLogin', sLoginCallback);

    return () => {
      roomSocket.off('sLogin', sLoginCallback);
    };
  }, []);

  // 2. 로그인을 할 때 접속 유저를 받기 : currentUsers - 같은 방에 접속 중인 유저
  useEffect(() => {
    if (!roomSocket) return;

    console.log('프로필 업데이트를 위한 접속 유저 useEffect!!');
    const currentUsersCallback = (usersInRoom) => {
      console.log('현재 접속 중인 사용자들:', usersInRoom);
      onUsers(usersInRoom);
    };

    roomSocket.on('currentUsers', currentUsersCallback);
    return () => {
      roomSocket.off('currentUsers', currentUsersCallback);
    };
  }, []);

  // 3. 로그인을 할 때 기존 채팅을 받기 : history - 채팅 히스토리
  useEffect(() => {
    console.log('채팅 히스토리 받기 useEffect!!');
    // 기존의 채팅 내역(DB) 수신
    roomSocket.on('chatHistory', (history) => {
      setMsgList((prev) => [
        ...prev,
        ...history.map((eachMsg) => ({
          msg: eachMsg.text,
          // target에 따른 스타일 적용
          type: eachMsg.nickname === nickname ? 'me' : 'other',
          id: eachMsg.nickname,
        })),
      ]);

      // 기존 채팅 내역이 없는 경우
      setPassNoHistoryStop(true);

      console.log('채팅 내역:', msgList);
    });

    return () => {
      roomSocket.off('chatHistory');
    };
  }, []);

  // 새 메세지가 올 때마다
  useEffect(() => {
    // 1. 채팅창의 대화 목록 스크롤 다운
    scrollToBottom();

    // 2. 최신 메세지를 애니메이션 클래스와 함께 추가
    if (msgList.length > 0) {
      const latestMessage = msgList[msgList.length - 1]; // 마지막 메세지
      setNewMessages((prev) => [...prev, latestMessage]);

      // 애니메이션 클래스를 제거
      setTimeout(() => {
        setNewMessages((prev) => prev.filter((msg) => msg !== latestMessage));
      }, 500); // 애니메이션 지속 시간과 일치
    }
  }, [msgList]); // 메세지가 올 때마다 아래로 내리기

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  /* ================ 2. Handler : 이벤트가 발생할 때 서버로 전송 ================ */

  // 로그인을 할 때(submit) 아이디(와 프로필 사진)를 서버에 전송
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onEnter(true);
    const userEmail2 = localStorage.getItem('LOGIN_EMAIL');
    const region = localStorage.getItem('REGION_NAME');
    const userNo = localStorage.getItem('USER_NO');
    const nickname = localStorage.getItem('NICK_NAME');

    let roomNumber;

    switch (region) {
      case '서울':
        roomNumber = 2;
        break;

      case '경기':
        roomNumber = 31;
        break;

      case '인천':
        roomNumber = 32;
        break;

      case '강원':
        roomNumber = 33;
        break;

      case '충남':
        roomNumber = 41;
        break;

      case '대전':
        roomNumber = 42;
        break;

      case '충북':
        roomNumber = 43;
        break;

      case '세종':
        roomNumber = 44;
        break;

      case '부산':
        roomNumber = 51;
        break;

      case '울산':
        roomNumber = 52;
        break;

      case '대구':
        roomNumber = 53;
        break;

      case '경북':
        roomNumber = 54;
        break;

      case '경남':
        roomNumber = 55;
        break;

      case '전남':
        roomNumber = 61;
        break;

      case '광주':
        roomNumber = 62;
        break;

      case '전북':
        roomNumber = 63;
        break;

      case '제주':
        roomNumber = 64;
        break;

      default:
        break;
    }
    setUserId(nickname);
    console.log('userEmail: ', nickname);
    roomSocket.emit('login', { userId: nickname, roomNumber }); // 서버로 아이디 전송 (처음에는 이름으로 전달)
    setIsLogin(true);
  };

  // 유저 이름 input태그(입력창)의 내용이 바뀔 때 발생하는 이벤트 핸들러
  // const onChangeUserIdHandler = (e) => {
  //   setUserId(e.target.value); // 값을 상태값에 저장
  // };

  // 필터링 할 단어 목록
  const dirtyWord = ['거지', '새끼', '멍청이', '똥개', '바보'];

  // 채팅 전송 이벤트 핸들러 (form)
  const onSendSubmitHandler = (e) => {
    e.preventDefault();

    if (msg.trim() === '') return;

    // 욕설을 필터링 하기
    const filteredMsg = dirtyWord.reduce((acc, substring) => {
      const regex = new RegExp(`(${substring})`, 'g'); // 각 substring 찾기
      return acc.replace(regex, (match) => {
        return match[0] + '*'.repeat(match.length - 1); // 첫글자를 제외하고 '*'로 가리기
      });
    }, msg);

    const sendData = {
      data: filteredMsg,
      id: userId,
      target: privateTarget, // 1:1 채팅 상대방 이메일도 같이 전송
    };
    roomSocket.emit('message', sendData); // 서버에 메세지(아이디, 메세지) 전송

    // 내가 보낸 메세지는 서버에 안보내고 바로 렌더링
    setMsgList((prev) => [
      ...prev,
      { msg: filteredMsg, type: 'me', id: userId },
    ]);
    setMsg('');
  };

  // 메세지 input 태그 핸들러
  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  };

  // 아이디 클릭 시 privateTarget 상태변수를 바꾸는 핸들러
  const onSetPrivateTarget = (e) => {
    const { id } = e.target.dataset;
    setPrivateTarget((prev) => (prev === id ? '' : id)); // toggle 방식
  };

  // 방번호를 선택하는 핸들러
  const onRoomChangeHandler = (e) => {
    setRoomNumber(e.target.value);
  };

  return (
    <div className='app-container'>
      <div className='wrap'>
        {isLogin ? (
          <div className='chat-box'>
            <ul className='chat'>
              {/* 서버로부터 받은 메세지들 */}
              {msgList.length > 0 &&
                msgList.map((v, i) =>
                  // 입장 메세지
                  /*
                v = { msg: data, type: 'other', id }
                i =
                */

                  v.type === 'welcome' ? (
                    // 입장 메세지
                    <li className='welcome' key={i}>
                      <div className='line' />
                      <div>{v.msg}</div>
                      <div className='line' />
                    </li>
                  ) : (
                    // 일반 메세지, className : me or other / private
                    <li
                      className={`${v.type} ${newMessages.includes(v) ? 'new-message' : ''}`}
                      key={`${i}_li`}
                      name={v.id}
                      data-id={v.id}
                    >
                      <div
                        className={`clickButton ${v.id === privateTarget ? 'private-user' : 'userId'}`}
                        data-id={v.id}
                        name={v.id}
                        onClick={onSetPrivateTarget}
                      >
                        {v.id}
                      </div>
                      <div className={v.type} data-id={v.id} name={v.id}>
                        {v.msg}
                      </div>
                    </li>
                  ),
                )}
              <li ref={messagesEndRef} />
            </ul>
            {/* 채팅 입력창 */}
            <form className='send-form' onSubmit={onSendSubmitHandler}>
              {/* privateTarget이 존재할 때, 이름을 표시 */}
              {privateTarget && (
                <div className='private-target'>{privateTarget}</div>
              )}
              <input
                placeholder='메세지를 입력해주세요'
                onChange={onChangeMsgHandler}
                value={msg}
              />
              <button type='submit' className='msgSendButton'>
                <FontAwesomeIcon icon={faPaperPlane} size='2x' />
              </button>
            </form>
          </div>
        ) : (
          // 로그인 이전 아이디 입력창
          <div className='login-box'>
            <div className='login-title'>
              <img src={logo} width='40px' height='40px' alt='logo' />
              <div>IOChat</div>
            </div>
            <form className='login-form' onSubmit={onSubmitHandler}>
              {/* 방번호 선택 */}
              <select onChange={onRoomChangeHandler}>
                <option value={regionName}>{regionName} 방</option>
                {/* <option value='2'>Room 2</option> */}
              </select>
              <input
                // style={{ display: 'none' }}
                // placeholder={userId}
                value={localStorage.getItem('LOGIN_EMAIL')}
                readOnly
              ></input>
              <button type='submit'>입장하기</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
