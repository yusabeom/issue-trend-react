import React, { createContext, useEffect, useState } from 'react';

const MyPageContext = createContext();

export const MyPageContextProvider = ({ children }) => {
  // 가장 최근에 본 10개의 게시물(번호)만 정렬
  // 11번째 게시물부터는 recentInquiry.shift();로 첫 요소 제거 후
  // recentInquiry.push('파스타'); 로 요소 추가
  const [recentInquiry, setRecentInquiry] = useState([]);

  return (
    <MyPageContext.Provider value={{ recentInquiry, setRecentInquiry }}>
      {children}
    </MyPageContext.Provider>
  );
};

export default MyPageContext;
