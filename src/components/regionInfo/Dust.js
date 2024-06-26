import React, { useEffect, useState } from 'react';
import DustData from './DustData';
import ResionSelect from './ResionSelect';
import styles from '../../styles/Dust.module.scss';
import { IoReloadOutline } from 'react-icons/io5';

import goodImg from '../../assets/img/character_01.png';
import normalImg from '../../assets/img/character_04.png';
import badImg from '../../assets/img/character_02.png';
import veryBadImg from '../../assets/img/character_03.png';
import { useNavigate } from 'react-router-dom';

const Dust = () => {
  const { head, grade, time, load } = styles;

  const [inputRegion, setInputRegion] = useState('서울');

  const onInputChange = (value) => {
    setInputRegion(value);
  };

  // 현재 시간
  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
  });

  // 리로딩 핸들러
  const reloadHandler = () => {
    setInputRegion((prev) => `${prev}`);
    console.log('새로고침 버튼');
  };

  return (
    <div>
      <div className={head}>
        <ResionSelect onInputChange={onInputChange} />
        <div className={grade}>
          <div>
            <img src={goodImg} width='40px' />
            <div>좋음</div>
          </div>
          <div>
            <img src={normalImg} width='40px' />
            <div>보통</div>
          </div>
          <div>
            <img src={badImg} width='40px' />
            <div>나쁨</div>
          </div>
          <div>
            <img src={veryBadImg} width='40px' />
            <div>매우나쁨</div>
          </div>
        </div>
      </div>
      <div className={time}>
        {dateString}
        <div className={load}>
          <IoReloadOutline onClick={reloadHandler} />
        </div>
      </div>
      <div>
        <DustData inputRegion={inputRegion} />
      </div>
    </div>
  );
};

export default Dust;
