import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/IssueReport.module.scss';
import ReportWriteModal from './ReportWriteModal.js';
import { Snackbar, Alert } from '@mui/material';

const IssueReport = () => {
  const { background, content, btn, 'btn-pulse': btnPulse } = styles;
  // snackbar 버튼 상태변수
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onOpenSnackbar = (opensn) => {
    setSnackbarOpen(opensn);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const childButtonRef = useRef(null);

  const openWriteModal = () => {
    childButtonRef.current.handleOpen();
  };
  return (
    <div className={background}>
      <div className={content}>
        <h2>이슈 트렌드는 여러분의 제보를 기다립니다.</h2>
        <h3>이메일 issuetrend@naver.com</h3>
        <h3>전화 02-0000-1234</h3>
        <div className={`${btn} ${btnPulse}`} onClick={openWriteModal}>
          제보하기
        </div>
        <div style={{ display: 'none' }}>
          <ReportWriteModal
            ref={childButtonRef}
            type={'write'}
            setSnackbarOpen={onOpenSnackbar}
          />
        </div>
      </div>
      <div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackBarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity='error'
            sx={{ width: '100%', zIndex: '100' }}
          >
            로그인 후 제보해주세요
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default IssueReport;
