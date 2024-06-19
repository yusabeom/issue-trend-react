import React, { createContext, useContext, useState } from 'react';

const KeywordContext = createContext();

const KeywordProvider = ({ children }) => {
  const [mainKeyword, setMainKeyword] = useState('');

  return (
    <KeywordContext.Provider value={{ mainKeyword, setMainKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
};

export { KeywordProvider, KeywordContext };
