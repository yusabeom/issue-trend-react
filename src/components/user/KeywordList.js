import React from 'react';

const KeywordList = () => {
  const keywords = [
    { id: 1, value: '시' },
    { id: 1, value: '미' },
    { id: 1, value: '리' },
  ];
  return (
    <ul>
      <li>{keywords[0]}</li>
      <li>{keywords[1]}</li>
      <li>{keywords[2]}</li>
    </ul>
  );
};

export default KeywordList;
