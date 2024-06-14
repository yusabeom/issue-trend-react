import React, { useEffect, useState } from 'react';
import styles from '../../styles/IssueReport.module.scss';

const IssueReport = () => {
  const { background, content, btn, 'btn-pulse': btnPulse } = styles;
  return (
    <div className={`${background} aspect-ratio`}>
      <div className={content}>
        <h2>이슈 트렌드는 여러분의 제보를 기다립니다.</h2>
        <h3>이메일 issuetrend@naver.com</h3>
        <h3>전화 02-123-4567</h3>
        <div className={`${btn} ${btnPulse}`}>제보하기</div>
      </div>
    </div>
  );
};

export default IssueReport;
