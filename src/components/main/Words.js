import React, { useContext, useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';
import heart from '../../assets/svg/cloud2.svg';
import { useNavigate } from 'react-router-dom';
import { KeywordContext } from '../../utils/KeywordContext';

const Words = ({ words }) => {
  const canvasRef = useRef(null);
  const { setMainKeyword } = useContext(KeywordContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (canvasRef.current) {
      const sortedWords = words.sort((a, b) => b[1] - a[1]);
      WordCloud(canvasRef.current, {
        list: sortedWords,
        shape: heart,
        gridSize: 3,
        weightFactor: function (size) {
          // return size;
          return Math.sqrt(size) * 9;
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
        drawOutOfBound: false,
        origin: [canvasRef.current.width / 2, canvasRef.current.height / 2],
      });
    }
  }, [words, setMainKeyword]);

  return <canvas ref={canvasRef} width={840} height={550} />;
};

export default Words;
