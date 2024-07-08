import React from 'react';
import styles from '../../styles/Intro.module.scss';
import { useNavigate } from 'react-router-dom';
import videoFile from '../../assets/video/introVideo.mp4';

const Intro = ({ onClick }) => {
  const {
    background,
    introContent,
    shadow,
    backContainer,
    homeBtn,
    css,
    backgroundVideo,
  } = styles;

  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/home');
  };

  return (
    <>
      <div className={background}>
        <div className={backContainer}>
          <div className={introContent}>ISSUE & TREND</div>

          <div className={`${introContent} ${shadow}`}>ISSUE & TREND</div>

          <div className={homeBtn} onClick={goHomePage}>
            HOME&nbsp;&nbsp;⟶
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
