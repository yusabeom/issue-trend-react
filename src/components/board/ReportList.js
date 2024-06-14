import React from 'react';
import Paging from '../../common/ui/Paging';
import ReportItem from './ReportItem';
import styles from '../../styles/ReportList.module.scss';

const ReportList = ({ boardList, size }) => {
  return (
    <div className={styles.reportListWrapper}>
      <div className={styles.reportList}>
        <ul>
          {boardList.forEach((board) => {
            <ReportItem key={board.id} board={board} />;
          })}
        </ul>
        <Paging size={size} />
      </div>
    </div>
  );
};

export default ReportList;
