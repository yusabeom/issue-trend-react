import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

const ResionSelect = ({ onInputChange }) => {
  const [region, setResion] = React.useState('');

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
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];
  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    // console.log(selectedRegion);
    onInputChange(selectedRegion);
  };
  return (
    <div>
      <select
        style={{ color: 'black', width: '80px', fontSize: '24px' }}
        onChange={handleChange}
        defaultValue='서울'
      >
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
      <HiChevronDown size='24' />
    </div>
  );
};

export default ResionSelect;
