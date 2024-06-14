import React, { useEffect } from 'react';
import styles from './UserInfo.module.scss';

const UserInfo = ({ userName, openAnimate }) => {
  useEffect(() => {
    console.log('openAnimate: ', openAnimate);
  }, [openAnimate]);
  return (
    <div
      className={` ${styles.userInfoContainer} ${openAnimate ? styles.fadeIn : ''}`}
    >
      <div className={styles.profileImageContainer}>
        <img
          src='https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp'
          alt='profile-image'
        />
      </div>
      <p>안녕하세요 저는 {userName} 입니다</p>
      <p>서울특별시 마포구</p>

      <ul className='userModeration'>
        <li className='reporting'>신고하기</li>
        <li className='DM'>1:1채팅</li>
        <li className='blocking'>차단하기</li>
      </ul>
    </div>
  );
};

export default UserInfo;
