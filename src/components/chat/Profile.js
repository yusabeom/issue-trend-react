import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { io } from 'socket.io-client';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import defaultImg from '../../assets/img/anonymous.jpg';
import axiosInstance from '../../config/axios-config';

const USER_URI = API_BASE_URL + USER; // /issue-trend

// users: 서버로부터 받은 채팅방 유저 목록 (닉네임)
const Profile = ({ clickName, users, enterTransfer }) => {
  const [userList, setUserList] = useState([]); // 서버로부터 받은 채팅방 유저 목록 (닉네임)

  useEffect(() => {
    console.log('fetch!!: ', users);
    const fetchUsers = async (user) => {
      try {
        const res = await axiosInstance.get(USER_URI + '/find-user', {
          params: { nickname: user },
        });
        const result = await res.data;
        console.log('result: ', result);
        const { userNo, profileImage, nickname } = result;

        setUserList((prev) => {
          const userExists = prev.some((user) => user.userNo === userNo);
          // 이미 존재하는 유저
          if (userExists) {
            return prev;
          }

          return [
            ...prev,
            {
              userNo,
              profileImage,
              nickname,
            },
          ];
        });
      } catch (error) {
        console.error(error);
      }
    };

    console.log('입장 하면 axios 수행: ', users);
    users.forEach((userNickname) => {
      console.log('users map에서 user nickname is ', userNickname);
      fetchUsers(userNickname);
    });
  }, [users]);

  useEffect(() => {
    console.log('userList:', userList);
  }, [userList]);

  const clickNameHandler = (e) => {
    const clickedUserName = e.target.getAttribute('data-name');
    // console.log(clickedUserName);
    clickName(clickedUserName);
  };

  return (
    <div className={styles.profile}>
      <ul className='userList'>
        {userList.map((user) => (
          <li key={user.userNo}>
            <div className={styles.profileImgContainer}>
              <img
                src={user.profileImage ? user.profileImage : defaultImg}
                alt='프로필사진'
              />
            </div>
            <div
              className={styles.profileName}
              onClick={clickNameHandler}
              data-name={user.nickname}
            >
              {user.nickname}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
