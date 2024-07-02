import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

const WeatherSelect = ({ onRegionChange }) => {
  const regions = [
    { name: '서울', nx: '60', ny: '127' },
    { name: '부산', nx: '98', ny: '76' },
    { name: '대구', nx: '89', ny: '90' },
    { name: '인천', nx: '55', ny: '124' },
    { name: '광주', nx: '58', ny: '74' },
    { name: '대전', nx: '67', ny: '100' },
    { name: '울산', nx: '102', ny: '84' },
    { name: '세종', nx: '66', ny: '103' },
    { name: '경기', nx: '60', ny: '120' },
    { name: '강원', nx: '73', ny: '134' },
    { name: '충북', nx: '69', ny: '107' },
    { name: '충남', nx: '68', ny: '100' },
    { name: '전북', nx: '63', ny: '89' },
    { name: '전남', nx: '51', ny: '67' },
    { name: '경북', nx: '87', ny: '106' },
    { name: '경남', nx: '91', ny: '77' },
    { name: '제주', nx: '52', ny: '38' },
  ];

  const handleChange = (e) => {
    const selectedRegion = regions.find(
      (region) => region.name === e.target.value,
    );
    console.log('Selected Region:', selectedRegion); // 디버그를 위해 선택된 지역 로깅
    onRegionChange(selectedRegion);
  };

  return (
    <div>
      <select
        style={{ color: 'black', width: '180px', fontSize: '16px' }}
        onChange={handleChange}
        defaultValue='서울'
      >
        {regions.map((region, index) => (
          <option key={index} value={region.name}>
            {region.name}
          </option>
        ))}
        ;
      </select>
      <HiChevronDown size='24' />
    </div>
  );
};

export default WeatherSelect;
