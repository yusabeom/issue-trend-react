import React from 'react';
import styles from './UserInfo.module.scss';

const UserInfo = ({ userName }) => {
  return (
    <div className={styles.userInfoContainer}>
      안녕하세요 저는 {userName} 입니다
    </div>
  );
};

export default UserInfo;
