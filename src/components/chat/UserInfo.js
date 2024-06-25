import React, { useEffect, useState } from 'react';
import styles from './UserInfo.module.scss';
import { API_BASE_URL, USER } from '../../config/host-config'; // /issue-trend
import defaultImg from '../../assets/img/anonymous.jpg';
import axios from 'axios';

const USER_URI = API_BASE_URL + USER;

const UserInfo = ({ userName, openAnimate }) => {
  const [thisUser, setThisUser] = useState({
    userNo: 0,
    profileImage: '',
    nickname: '',
    regionName: '',
    email: '',
  });

  useEffect(() => {
    console.log('openAnimate: ', openAnimate);
  }, [openAnimate]);

  // 지역 이름 바꾸기
  const formattedRegionName = (regionName) => {
    switch (regionName) {
      case '서울':
        return '서울특별시';

      case ('인천', '대구', '부산', '광주', '울산', '대전'):
        return regionName + '광역시';

      case '경남':
        return '경상남도';

      case '경북':
        return '경상북도';

      case '전남':
        return '전라남도';

      case '전북':
        return '전라북도';

      case '충남':
        return '충청남도';

      case '충북':
        return '충청북도';

      case ('강원', '제주', '세종'):
        return regionName + '특별자치도';

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('GET url: ', USER_URI + '/find-user');
        const res = await axios.get(USER_URI + '/find-user', {
          params: { nickname: userName },
        });
        const result = await res.data;
        console.log('result: ', result);
        const { userNo, profileImage, nickname, regionName, email } = result;

        const newRegionName = formattedRegionName(regionName);
        setThisUser((prev) => {
          return {
            userNo,
            profileImage,
            nickname,
            regionName: newRegionName,
            email,
          };
        });
        console.log('thisUser: ', thisUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userName]);

  return (
    <div
      className={` ${styles.userInfoContainer} ${openAnimate ? styles.fadeIn : ''}`}
    >
      <div className={styles.profileImageContainer}>
        <img
          src={
            thisUser.profileImage !== null ? thisUser.profileImage : defaultImg
          }
          alt='profile-image'
        />
      </div>
      <p>안녕하세요 저는 {thisUser.nickname} 입니다</p>
      <p className={styles.email}> {thisUser.email}</p>
      <p>{thisUser.regionName}</p>

      <ul className='userModeration'>
        <li className='reporting'>신고하기</li>
        <li className='DM'>1:1채팅</li>
        <li className='blocking'>차단하기</li>
      </ul>
    </div>
  );
};

export default UserInfo;
