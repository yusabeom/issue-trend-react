import React from 'react';
import styles from '../../styles/ReportItem.module.scss';
import { useNavigate } from 'react-router-dom';

const ReportItem = ({ board }) => {
  const navigate = useNavigate();
  const goToDetail = (e) => {
    const boardNo = e.target.parentNode.firstChild.textContent;
    console.log(boardNo);
    navigate(`/board/detail/${boardNo}`);
  };

  return (
    <tr className={styles.oneItem}>
      <td className={styles.boardNo}>{board.postNo}</td>
      <td className={styles.boardTitle} onClick={goToDetail}>
        {board.title}
      </td>
      <td className={styles.boardWriter}>{board.email}</td>
      <td className={styles.boardDate}>{board.formatDate}</td>
    </tr>
  );
};

export default ReportItem;
