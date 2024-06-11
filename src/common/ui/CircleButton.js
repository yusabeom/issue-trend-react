import React from 'react';

const CircleButton = ({ text, onClickEvent }) => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
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
