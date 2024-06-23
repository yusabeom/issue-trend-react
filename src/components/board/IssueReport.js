import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/IssueReport.module.scss';
import ReportWriteModal from './ReportWriteModal.js';

const IssueReport = () => {
  const { background, content, btn, 'btn-pulse': btnPulse } = styles;

  const childButtonRef = useRef(null);

  const openWriteModal = () => {
    childButtonRef.current.handleOpen();
  };
  return (
    <div className={`${background} aspect-ratio`}>
      <div className={content}>
        <h2>이슈 트렌드는 여러분의 제보를 기다립니다.</h2>
        <h3>이메일 issuetrend@naver.com</h3>
        <h3>전화 02-0000-1234</h3>
        <div className={`${btn} ${btnPulse}`} onClick={openWriteModal}>
          제보하기
        </div>
        <div style={{ display: 'none' }}>
          <ReportWriteModal ref={childButtonRef} type={'write'} />
        </div>
      </div>
    </div>
  );
};

export default IssueReport;
