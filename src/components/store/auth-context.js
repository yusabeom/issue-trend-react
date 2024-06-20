import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  userEmail: '',
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  console.log('App 컴포넌트 실행!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const loginHandler = (token, userEmail) => {
    localStorage.setItem('ACCESS_TOKEN', token.access_token);
    localStorage.setItem('REFRESH_TOKEN', token.refresh_token);
    localStorage.setItem('LOGIN_EMAIL', userEmail);
    setIsLoggedIn(true);
    setUserEmail(userEmail);
  };
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail('');
  };

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
