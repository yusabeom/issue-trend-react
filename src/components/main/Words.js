import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';
import heart from '../../assets/svg/cloud.svg';
import { useNavigate } from 'react-router-dom';

const Words = ({ words }) => {
  const canvasRef = useRef(null);
  // console.log(words);
  const navigate = useNavigate();

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      navigate(`/todayArticles?keyword=${keyword}`);
    } else {
      alert('Please enter a keyword');
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      WordCloud(canvasRef.current, {
        list: words,
        shape: heart,
        gridSize: 5,
        weightFactor: function (size) {
          return size * 2;
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

          handleSearch(keyword);
        },

        rotateRatio: 0.5,
        rotationSteps: 4,
        backgroundColor: 'transparent',
        drawOutOfBound: true,
      });
    }
  }, [words]);

  return <canvas ref={canvasRef} width={820} height={500} />;
};

export default Words;
