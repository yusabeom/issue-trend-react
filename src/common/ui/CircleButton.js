import { fontWeight } from '@mui/system';
import React from 'react';

const CircleButton = ({ text, onClickEvent }) => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#FFA927',
    border: 'none',
    cursor: 'pointer',
    color: '#1B1511',
    fontSize: '24px',
    lineHeight: '24px',
  };

  return (
    <div style={buttonStyle} onClick={onClickEvent}>
      {text}
    </div>
  );
};

export default CircleButton;
