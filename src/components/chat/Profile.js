import React from 'react';
import styles from './Profile.module.scss';

const Profile = ({ clickName }) => {
  const clickNameHandler = (e) => {
    const clickedUserName = e.target.getAttribute('data-name');
    // console.log(clickedUserName);
    clickName(clickedUserName);
  };
  return (
    <div className={styles.profile}>
      <ul className='userList'>
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
            data-name={'cs'}
          >
            춘식이
          </div>
        </li>
        <li>
          <div className={styles.profileImgContainer}>
            <img
              src='https://flexible.img.hani.co.kr/flexible/normal/400/500/imgdb/original/2023/0503/20230503501277.jpg'
              alt='프로필사진'
            />
          </div>
          <div
            className={styles.profileName}
            onClick={clickNameHandler}
            data-name={'madongsuk'}
          >
            user2
          </div>
        </li>
        <li>
          <div className={styles.profileImgContainer}>
            <img
              src='https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/5FL0/image/xLbJIwcn-Lfseo85FZsiNfyRLgA.jpg'
              alt='프로필사진'
            />
          </div>
          <div
            className={styles.profileName}
            onClick={clickNameHandler}
            data-name={'caocao'}
          >
            {' '}
            user3
          </div>
        </li>
        <li>
          <div className={styles.profileImgContainer}>
            <img
              src='https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png'
              alt='프로필사진'
            />
          </div>
          <div
            className={styles.profileName}
            onClick={clickNameHandler}
            data-name={'jjang'}
          >
            user4
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
