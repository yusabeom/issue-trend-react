import React from 'react';
import styles from '../../styles/ReportItem.module.scss';

const ReportItem = ({ board }) => {
  return (
    <li className={styles.oneItem}>
      <p>{board.id}</p>
      <p>{board.region}</p>
      <p>{board.title}</p>
      <p>{board.writer}</p>
      <p>{board.datetime}</p>
    </li>
  );
};

export default ReportItem;
