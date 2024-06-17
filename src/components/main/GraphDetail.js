import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const GraphDetail = ({ words }) => {
  const key = words.map((key) => key.keyword);
  const count = words.map((count) => count.frequency);
  // console.log(key);
  const data = {
    labels: key,
    datasets: [
      {
        label: '오늘의 키워드',
        data: count, // 검색 count
        backgroundColor: [
          'rgb(5, 12, 156)',
          'rgb(53, 114, 239)',
          'rgb(58, 190, 249)',
          'rgb(167, 230, 255)',
          'rgb(119, 82, 254)',
          'rgb(133, 15, 141)',
          'rgb(199, 56, 189)',
          'rgb(228, 155, 255)',
          'rgb(248, 249, 215)',
          'rgb(225, 175, 209)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default GraphDetail;
