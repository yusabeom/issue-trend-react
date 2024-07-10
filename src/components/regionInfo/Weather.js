import React, { useEffect, useState } from 'react';
import WeatherSelect from './WeatherSlect';
import WeatherData from './WeatherData'; // 추가된 컴포넌트 import
import { API_BASE_URL, USER } from '../../config/host-config';

const Weather = () => {
  const [inputRegion, setInputRegion] = useState({
    name: '서울',
    nx: '60',
    ny: '127',
  });
  const [weatherInfo, setWeatherInfo] = useState(null); // 날씨 정보를 저장할 상태

  // 이벤트 핸들러를 명시적으로 정의
  const handleRegionChange = (region) => {
    console.log('Region changed to:', region); // 선택된 지역 로깅
    setInputRegion(region);
  };

  useEffect(() => {
    // API 요청 함수 정의
    const fetchWeatherData = async () => {
      const url =
        API_BASE_URL +
        `/issue-trend/weather?nx=${inputRegion.nx}&ny=${inputRegion.ny}`;
      console.log('Fetching data from:', url); // 요청 URL 로깅
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Received data:', data); // 받은 데이터 로깅
        setWeatherInfo(data); // 날씨 정보 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    // API 요청 실행 조건 검사
    if (inputRegion.nx && inputRegion.ny) {
      fetchWeatherData();
    }
  }, [inputRegion]); // 의존성 배열에 inputRegion 전체 추가

  return (
    <div>
      <WeatherSelect onRegionChange={handleRegionChange} />
      <WeatherData weather={weatherInfo} />
    </div>
  );
};

export default Weather;
