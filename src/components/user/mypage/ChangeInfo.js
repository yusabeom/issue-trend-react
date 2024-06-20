import React from 'react';
import styles from '../../../styles/ChangeInfo.module.scss';
import { TextField } from '@mui/material';

const ChangeInfo = () => {
  const { title, content, inputField } = styles;
  return (
    <>
      <div className={title}>내정보 변경</div>
      <div className={content}>
        <TextField
          required
          id='outlined-required'
          label='이메일'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='현재비밀번호'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='비밀번호 변경'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='비밀번호 확인'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='닉네임'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='주소'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='관심주제'
          defaultValue=''
          className={inputField}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </>
  );
};

export default ChangeInfo;
