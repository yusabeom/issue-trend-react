import React from 'react';
import styles from '../../styles/ByTypeNews.module.scss';

const RegionSelector = ({ onRegionChange }) => {
  const { newsTitle } = styles;
  const regions = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충청',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];

  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    onRegionChange(selectedRegion);
  };

  return (
    <div className={newsTitle}>
      <select onChange={handleChange} defaultValue='서울▼'>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelector;
