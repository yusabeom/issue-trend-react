import React from 'react';
import Paging from '../../common/ui/Paging';
import ReportItem from './ReportItem';
import styles from '../../styles/ReportList.module.scss';
import { useNavigate } from 'react-router-dom';

// size : 페이지 당 게시물 수
// count : 전체 페이지 수
// page : 현재 페이지 번호
const ReportList = ({ boardList, size, count, page }) => {
  return (
    <div className={styles.reportListWrapper}>
      <table>
        <tr className={styles.boardHead}>
          <th className={styles.boardNo}>번호</th>
          <th className={styles.boardTitle}>제목</th>
          <th className={styles.boardWriter}>작성자</th>
          <th className={styles.boardDate}>작성일</th>
        </tr>
        {boardList.map((board) => (
          <ReportItem key={board.postNo} board={board} />
        ))}
      </table>

      <div className={styles.pagination}>
        {count > 1 && (
          <Paging size={size} count={count} curPage={page} type={'board'} />
        )}
      </div>
    </div>
  );
};

export default ReportList;
