import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios-config';
import { API_BASE_URL, USER } from '../../config/host-config';
import { reverseRegionCode } from './regionCode';

const CHAT_URL = API_BASE_URL + '/restaurant/chat';

const ChatLobby = () => {
  const [curRegionUsers, setCurRegionUsers] = useState({
    2: 0,
    31: 0,
    32: 0,
  });

  const fetchRoomDate = async () => {
    try {
      console.log('GET 요청 url: ', CHAT_URL);
      const res = await axiosInstance.get(CHAT_URL);
      const getUsersNo = await res.data;
      console.log('getUsersNo:', getUsersNo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoomDate();
  }, []);
  return (
    <div>
      <h2>금일 접속자 수</h2>
    </div>
  );
};

export default ChatLobby;
