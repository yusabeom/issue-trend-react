import React from 'react';
import styles from '../../styles/WeatherData.module.scss';
import * as d3 from 'd3';
import sun from '../../assets/img/sun.png';
import night from '../../assets/img/night.png';
import nightco from '../../assets/img/nightcoudiness.png';
import rain from '../../assets/img/rain.png';
import raindrop from '../../assets/img/raindrop.png';
import rainsnow from '../../assets/img/rainsnow.png';
import snow from '../../assets/img/snow.png';
import sr from '../../assets/img/sr.png';
import turbid from '../../assets/img/turbidity.png';
import mp from '../../assets/img/mpartlycloudy.png';
import { HashLoader } from 'react-spinners';

const WeatherData = ({ weather }) => {
  if (!weather)
    return (
      <div className={styles.load}>
        <HashLoader color='#0066ff' size={70} />
      </div>
    );

  const temperatures = Object.values(weather).map((details) =>
    parseInt(details.T1H, 10),
  );
  const minTemperature = Math.min(...temperatures) - 7;
  const maxTemperature = Math.max(...temperatures) + 7;

  const formatTime = (timeString) => `${timeString.slice(0, 2)}`;
  const calculateHeight = (temperature) =>
    ((temperature - minTemperature) / (maxTemperature - minTemperature)) * 150;

  const lineGenerator = d3
    .line()
    .x((_, i) => i * 60 + 30)
    .y((d) => 200 - calculateHeight(d))
    .curve(d3.curveLinear);

  const pathData = lineGenerator(temperatures);
  const getWindDirection = (UUU, VVV, WSD) => {
    let direction = '';
    if (UUU === 0 && VVV === 0) {
      direction = VVV >= 0 ? '북풍' : '남풍';
    } else if (UUU === 0) {
      direction = VVV > 0 ? '북풍' : '남풍';
    } else if (VVV === 0) {
      direction = UUU > 0 ? '동풍' : '서풍';
    } else {
      const northSouth = VVV > 0 ? '북' : '남';
      const eastWest = UUU > 0 ? '동' : '서';
      direction = northSouth + eastWest + '풍';
    }
    return `${direction}: ${parseFloat(WSD).toFixed(1)}m/s`; // 풍속과 함께 방향을 문자열로 반환
  };
  const getWeatherIcon = (sky, pty, hour) => {
    const hourInt = parseInt(hour, 10);
    const isNight = hourInt >= 19 || hourInt <= 6;

    if (pty !== '0') {
      switch (pty) {
        case '1':
          return rain;
        case '2':
          return rainsnow;
        case '3':
          return snow;
        case '5':
          return raindrop;
        case '6':
          return sr;
        case '7':
          return snow;
        default:
          return sun;
      }
    } else if (sky === 4) {
      return turbid;
    } else {
      return isNight
        ? sky === '1'
          ? night
          : sky === '3'
            ? nightco
            : night
        : sky === '1'
          ? sun
          : sky === '3'
            ? mp
            : sun;
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.currentWeather}>
        {Object.entries(weather).map(
          ([time, details], index) =>
            index === 0 && (
              <div key={time}>
                <div
                  className='wea'
                  style={{ display: 'flex', fontSize: '70px' }}
                >
                  <img
                    src={getWeatherIcon(
                      details.SKY,
                      details.PTY,
                      parseInt(time.slice(0, 2), 10),
                    )}
                    alt='Weather Icon'
                    style={{ width: '110px' }}
                  />
                  <p style={{ marginTop: '13px' }}>{details.T1H}°C</p>
                </div>

                <p
                  style={{
                    fontSize: '25px',
                    position: 'relative',
                    left: '60px',
                  }}
                >
                  습도: {details.REH}%
                </p>
                <p
                  style={{
                    fontSize: '25px',
                    position: 'relative',
                    left: '60px',
                  }}
                >
                  풍속: {details.WSD} m/s
                </p>
                <p
                  style={{
                    fontSize: '25px',
                    position: 'relative',
                    left: '60px',
                  }}
                >
                  풍향: {details.VEC}
                </p>
                <p
                  style={{
                    width: '200px',
                    fontSize: '25px',
                    position: 'relative',
                    left: '35px',
                  }}
                >
                  {getWindDirection(details.UUU, details.VVV, details.WSD)}
                </p>
              </div>
            ),
        )}
      </div>
      <div className={styles.temperatureGraph}>
        <svg width='500' height='300' viewBox='0 0 500 300'>
          <path
            d={pathData}
            fill='none'
            stroke='#ccc'
            strokeWidth='2'
            transform='translate(-13, -10)'
          />
          {temperatures.map((temp, i) => (
            <g key={i} transform={`translate(${i * 60 + 30}, 0)`}>
              <text
                x='-10'
                y={170 - calculateHeight(temp)}
                textAnchor='middle'
                style={{ fill: 'black' }}
              >
                {temp}°C
              </text>
              <rect
                x='-15'
                y={200 - calculateHeight(temp)}
                width='5'
                height={calculateHeight(temp)}
                fill='lightgrey'
              />
              <text x='-12' y='250' textAnchor='middle'>
                {formatTime(Object.keys(weather)[i])}
              </text>
              <image
                href={getWeatherIcon(
                  Object.values(weather)[i].SKY,
                  Object.values(weather)[i].PTY,
                  parseInt(Object.keys(weather)[i].slice(0, 2), 10),
                )}
                x='-25'
                y={200}
                height='30px'
                width='30px'
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default WeatherData;
