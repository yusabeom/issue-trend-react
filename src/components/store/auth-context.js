import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  userEmail: '',
  userNo: '',
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  console.log('App 컴포넌트 실행!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userNo, setUserNo] = useState('');

  // token, email, loginPath, profileImage, regionName
  const loginHandler = (
    token,
    userEmail,
    loginPath,
    profileImage,
    regionName,
    userNo,
  ) => {
    localStorage.setItem('ACCESS_TOKEN', token.access_token);
    localStorage.setItem('REFRESH_TOKEN', token.refresh_token);
    localStorage.setItem('LOGIN_EMAIL', userEmail);
    localStorage.setItem('LOGIN_PATH', loginPath);
    localStorage.setItem('PROFILE_IMAGE', profileImage);
    localStorage.setItem('REGION_NAME', regionName);
    localStorage.setItem('USER_NO', userNo);

    setIsLoggedIn(true);
    setUserEmail(userEmail);
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
    }
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
