import { Chart } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

// const data = [
//   {
//     number: 1,
//     keyword: '교통',
//   },
//   {
//     number: 2,
//     keyword: '사회',
//   },
//   {
//     number: 3,
//     keyword: '범죄',
//   },
//   {
//     number: 4,
//     keyword: '재판결과',
//   },
// ];

const GraphDetail = () => {
  const data = {
    labels: ['교통사고', '사회', '범죄', '재판결과', '사건'],
    datasets: [
      {
        label: '오늘의 검색 키워드',
        data: [300, 50, 100, 20, 100], // 검색 count
        backgroundColor: [
          'rgb(5, 12, 156)',
          'rgb(53, 114, 239)',
          'rgb(58, 190, 249)',
          'rgb(167, 230, 255)',
          'rgb(119, 82, 254)',
        ],
        // hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default GraphDetail;
