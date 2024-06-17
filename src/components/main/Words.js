import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';
import heart from '../../assets/svg/cloud.svg';

const Words = ({ words }) => {
  console.log(words);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      WordCloud(canvasRef.current, {
        list: words,
        shape: heart,
        gridSize: 6,
        weightFactor: function (size) {
          return Math.sqrt(size) * 6;
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

        rotateRatio: 0.5,
        rotationSteps: 4,
        backgroundColor: 'transparent',
        drawOutOfBound: true,
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={760} height={500} />;
};

export default Words;
