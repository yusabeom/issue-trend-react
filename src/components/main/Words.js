import React, { useContext, useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';
import heart from '../../assets/svg/cloud.svg';
import { useNavigate } from 'react-router-dom';
import { KeywordContext } from '../../utils/KeywordContext';

const Words = ({ words }) => {
  const canvasRef = useRef(null);
  const { setMainKeyword } = useContext(KeywordContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (canvasRef.current) {
      WordCloud(canvasRef.current, {
        list: words,
        shape: heart,
        gridSize: 3,
        weightFactor: function (size) {
          return size * 1.3;
        },
        fontWeight: 'bold',
        color: function () {
          return (
            'rgb(' +
            Math.round(Math.random() * 255) +
            ',' +
            Math.round(Math.random() * 255) +
            ',' +
            Math.round(Math.random() * 255) +
            ')'
          );
        },
        click: function (items) {
          const keyword = items[0];
          console.log(keyword);
          navigate('/news');
          setMainKeyword(keyword);
        },

        rotateRatio: 0.5,
        rotationSteps: 4,
        backgroundColor: 'transparent',
        drawOutOfBound: true,
      });
    }
  }, [words, setMainKeyword]);

  return <canvas ref={canvasRef} width={820} height={500} />;
};

export default Words;
