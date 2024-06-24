import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  userNo: '',
  userEmail: '',
  profileImage: '',
  nickname: '',
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  console.log('App 컴포넌트 실행!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [userNo, setUserNo] = useState('');

  // token, email, loginPath, profileImage, regionName
  const loginHandler = (
    token,
    userEmail,
    loginPath,
    profileImage,
    regionName,
    nickname,
    userNo,
  ) => {
    localStorage.setItem('ACCESS_TOKEN', token.access_token);
    localStorage.setItem('REFRESH_TOKEN', token.refresh_token);
    localStorage.setItem('LOGIN_EMAIL', userEmail);
    localStorage.setItem('LOGIN_PATH', loginPath);
    localStorage.setItem('PROFILE_IMAGE', profileImage);
    localStorage.setItem('REGION_NAME', regionName);
    localStorage.setItem('NICK_NAME', nickname);
    localStorage.setItem('USER_NO', userNo);
    setIsLoggedIn(true);
    setUserEmail(userEmail);
    setProfileImage(profileImage);
    setNickname(nickname);
    setUserNo(userNo);
  };
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail('');
  };

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem('LOGIN_EMAIL'));
      setProfileImage(localStorage.getItem('PROFILE_IMAGE'));
      setNickname(localStorage.getItem('NICK_NAME'));
      setUserNo(localStorage.getItem('USER_NO'));
    }
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        profileImage,
        nickname,
        userNo,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
