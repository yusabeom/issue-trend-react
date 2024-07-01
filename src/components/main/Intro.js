import React from 'react';
import styles from '../../styles/Intro.module.scss';
import { useNavigate } from 'react-router-dom';

const Intro = ({ onClick }) => {
  const { background, introContent, shadow, backContainer, homeBtn, css } =
    styles;

  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/home');
  };

  return (
    <>
      <div className={background}>
        <div className={backContainer}>
          <div className={introContent}>
            ISSUE & TREND ISSUE & TREND ISSUE & TREND ISSUE & TREND ISSUE &
            TREND ISSUE
          </div>
          <div className={`${introContent} ${shadow}`}>
            ISSUE & TREND ISSUE & TREND ISSUE & TREND ISSUE & TREND ISSUE &
            TREND
          </div>

          <div className={homeBtn} onClick={goHomePage}>
            HOME&nbsp;&nbsp;⟶
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
