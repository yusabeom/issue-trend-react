import React, { useContext } from 'react';
import AuthContext from '../../components/store/auth-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';
import { Alert, Button } from '@mui/material';

const SCRAP = API_BASE_URL + USER + '/scrap'; // '/issue-trend/scrap'

const ScrapBtn = ({ articleCode }) => {
  const { isLoggedIn, onLogout, userEmail, profileImage, nickname, userNo } =
    useContext(AuthContext);
  const [openAlert, setOpenAlert] = React.useState(false); // 스크랩 중복 alert 메세지 여부
  const [openOk, setOpenOk] = React.useState(false); // 스크랩 정상 스크랩랩 메세지 여부

  // 스크랩 하기
  const handleScrap = async () => {
    try {
      console.log(
        'POST url: ',
        SCRAP,
        `userNo: ${userNo}, articleCode: ${articleCode}`,
      );
      const res = await axios.post(SCRAP, { userNo, articleCode });
      const result = res.data;
      setOpenOk(true);
    } catch (error) {
      console.log('중복된 데이터');
      setOpenOk(false);
      setOpenAlert(true);
    }
  };

  return (
    <div>
      <Button
        variant='outlined'
        onClick={handleScrap}
        style={{ margin: '1rem' }}
      >
        <FontAwesomeIcon icon={faStar} />
        &nbsp;스크랩
      </Button>
      {openOk && (
        <Alert style={{ margin: '1rem' }} severity='success'>
          정상적으로 스크랩 되었습니다.
        </Alert>
      )}
      {openAlert && (
        <Alert style={{ margin: '1rem' }} severity='error'>
          이미 스크랩 한 기사입니다.
        </Alert>
      )}
    </div>
  );
};

export default ScrapBtn;
