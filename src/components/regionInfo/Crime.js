import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const Crime = () => {
  const [chartData, setChartData] = useState(null);
  let regionName = localStorage.getItem('REGION_NAME');
  if (regionName === null) regionName = '경기';

  useEffect(() => {
    const fetchData = () => {
      console.log('지역 : ', regionName);

      axios
        .get(`http://localhost:8181/issue-trend/api/crime`, {
          params: { region: regionName },
        })
        .then((response) => {
          console.log('response : ', response);
          const sortedData = response.data.sort(
            (a, b) => b.frequency - a.frequency,
          );
          prepareChartData(sortedData.slice(0, 10));
        })
        .catch((error) => {
          console.error('There was an error fetching the data!', error);
        });
    };

    fetchData(); // fetchData 함수는 useEffect 내부에서 호출
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const prepareChartData = (data) => {
    const categories = data.map((item) => item.category);
    const frequencies = data.map((item) => item.frequency);
    const backgroundColors = data.map(() => getRandomColor());

    const chartData = {
      labels: categories,
      datasets: [
        {
          label: '범죄 발생 횟수',
          data: frequencies,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
    setChartData(chartData);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
        }}
      >
        <div>
          {chartData && (
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '300px', height: '300px' }}>
          {chartData && <Pie data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default Crime;
