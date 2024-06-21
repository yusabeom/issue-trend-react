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
      <ul>
        {boardList.map((board) => (
          <ReportItem key={board.postNo} board={board} />
        ))}
      </ul>
      <div className={styles.pagination}>
        {count > 1 && (
          <Paging size={size} count={count} curPage={page} type={'board'} />
        )}
      </div>
    </div>
  );
};

export default ReportList;
