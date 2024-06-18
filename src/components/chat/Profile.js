import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { io } from 'socket.io-client';
const roomSocket = io('http://192.168.0.27:5000');

const Profile = ({ clickName, users }) => {
  const [userList, setUserList] = useState([]); // 서버로부터 받은 채팅방 유저 목록

  const clickNameHandler = (e) => {
    const clickedUserName = e.target.getAttribute('data-name');
    // console.log(clickedUserName);
    clickName(clickedUserName);
  };

  return (
    <div className={styles.profile}>
      <ul className='userList'>
        {users.map((user) => (
          <li>
            <div className={styles.profileImgContainer}>
              <img
                src='https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp'
                alt='프로필사진'
              />
            </div>
            <div
              className={styles.profileName}
              onClick={clickNameHandler}
              data-name={user}
            >
              {user}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
