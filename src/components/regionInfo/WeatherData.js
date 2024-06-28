import React from 'react';
import styles from '../../styles/WeatherData.module.scss';
import * as d3 from 'd3';

const WeatherData = ({ weather }) => {
  if (!weather) return <div>Loading...</div>;

  const minTemperature = -30; // 최소 온도 설정
  const maxTemperature = 50; // 최대 온도 설정

  const formatTime = (timeString) => `${timeString.slice(0, 2)}:00`;
  const calculateHeight = (temperature) => {
    const range = maxTemperature - minTemperature;
    return ((temperature - minTemperature) / range) * 150;
  };

  // d3 곡선 그래프 설정
  const lineGenerator = d3
    .line()
    .x((_, i) => i * 60) // x 위치 설정
    .y((d) => 200 - calculateHeight(d)) // y 위치 설정
    .curve(d3.curveNatural);

  const temperatures = Object.values(weather).map((details) =>
    parseInt(details.T1H),
  );
  const pathData = lineGenerator(temperatures);

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.currentWeather}>
        <h2>Current Weather</h2>
        {Object.entries(weather).map(
          ([time, details], index) =>
            index === 0 && (
              <div key={time}>
                <h3>{formatTime(time)}</h3>
                <p>Temperature: {details.T1H}°C</p>
                <p>Humidity: {details.REH}%</p>
                <p>Wind Speed: {details.WSD} m/s</p>
                <p>Wind Direction: {details.VEC}°</p>
                {details.PTY === '0' && <p>Sky State: {details.SKY}</p>}
              </div>
            ),
        )}
      </div>
      <div className={styles.temperatureGraph}>
        <h2>Hourly Temperature Graph</h2>
        <svg width='360' height='200'>
          <path d={pathData} fill='none' stroke='orange' strokeWidth='2' />
          {temperatures.map((temp, i) => (
            <g key={i} transform={`translate(${i * 60}, 0)`}>
              <text
                x={0}
                y={200 - calculateHeight(temp) - 10}
                textAnchor='middle'
                style={{ fill: 'black' }}
              >
                {temp}°C
              </text>
              <circle
                cx={0}
                cy={200 - calculateHeight(temp)}
                r='3'
                fill='orange'
              />
              <rect
                x={-15}
                y={200 - calculateHeight(temp)}
                width='30'
                height={calculateHeight(temp)}
                fill='lightgrey'
              />
              <text x={0} y='195' textAnchor='middle'>
                {formatTime(Object.keys(weather)[i])}
              </text>{' '}
              {/* 시간 수정 */}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default WeatherData;
