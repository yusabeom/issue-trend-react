import React from 'react';

const ReportItem = ({ board }) => {
  return (
    <li>
      <p>{board.id}</p>
      <p>{board.region}</p>
      <p>{board.title}</p>
      <p>{board.writer}</p>
      <p>{board.datetime}</p>
    </li>
  );
};

export default ReportItem;
