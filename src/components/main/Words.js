import React, { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';
import heart from '../../assets/svg/cloud.svg';

const word = [
  ['강력범죄', 20],
  ['경기남부', 20],
  ['사고', 20],
  ['집단괴롭힘', 20],
  ['강력범죄', 20],
  ['경기남부', 20],
  ['교통', 20],
  ['집단괴롭힘', 20],
  ['강력범죄', 90],
  ['경기남부', 20],
  ['교통', 20],
  ['집단괴롭힘', 20],
  ['강력범죄', 20],
  ['강력범죄', 20],
  ['경기남부', 20],
  ['사고', 150],
  ['집단괴롭힘', 20],
  ['강력범죄', 20],
  ['경기남부', 20],
  ['교통', 20],
  ['집단괴롭힘', 20],
  ['강력범죄', 20],
  ['경기남부', 20],
  ['교통', 20],
  ['집단괴롭힘', 20],
  ['강력범죄', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 90],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 100],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
  ['교통', 20],
];

const Words = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      WordCloud(canvasRef.current, {
        list: word,
        shape: heart,
        gridSize: 6,
        weightFactor: function (size) {
          return Math.sqrt(size) * 6;
        },
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
