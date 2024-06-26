import React, { useEffect, useState } from 'react';
import DustData from './DustData';
import ResionSelect from './ResionSelect';
import styles from '../../styles/Dust.module.scss';

const Dust = () => {
  const { head } = styles;

  const [inputRegion, setInputRegion] = useState('서울');

  const onInputChange = (value) => {
    setInputRegion(value);
  };

  return (
    <div>
      <div className={head}>
        <ResionSelect onInputChange={onInputChange} />
      </div>
      <div>
        <DustData inputRegion={inputRegion} />
      </div>
    </div>
  );
};

export default Dust;
