import { Chart } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const rank = [
  {
    count: 20,
    keyword: '교통',
  },
  {
    count: 100,
    keyword: '사회',
  },
  {
    count: 300,
    keyword: '범죄',
  },
  {
    count: 50,
    keyword: '재판결과',
  },
  {
    count: 20,
    keyword: '사건',
  },
];

// ['교통사고', '사회', '범죄', '재판결과', '사건']

const GraphDetail = () => {
  const key = rank.map((key) => key.keyword);
  const count = rank.map((count) => count.count);
  console.log(key);
  const data = {
    labels: key,
    datasets: [
      {
        label: '오늘의 검색 키워드',
        data: count, // 검색 count
        backgroundColor: [
          'rgb(5, 12, 156)',
          'rgb(53, 114, 239)',
          'rgb(58, 190, 249)',
          'rgb(167, 230, 255)',
          'rgb(119, 82, 254)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default GraphDetail;
