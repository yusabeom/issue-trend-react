import React from 'react';
import Paging from '../../common/ui/Paging';
import ReportItem from './ReportItem';
import styles from '../../styles/ReportList.module.scss';

// size : 페이지 당 게시물 수
// count : 전체 페이지 수
// page : 현재 페이지 번호
const ReportList = ({ boardList, size, count, page }) => {
  return (
    <div className={styles.reportListWrapper}>
      <ul>
        {boardList.map((board) => (
          <ReportItem key={board.id} board={board} />
        ))}
      </ul>
      <div className={styles.pagination}>
        {count > 1 && (
          <Paging size={size} count={count} curPage={page} type={'report'} />
        )}
      </div>
    </div>
  );
};

export default ReportList;
