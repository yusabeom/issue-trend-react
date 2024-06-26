import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios-config';
import { ImBaffled, ImCool, ImCrying, ImHappy } from 'react-icons/im';
import styles from '../../styles/DustData.module.scss';

import goodImg from '../../assets/img/character_01.png';
import normalImg from '../../assets/img/character_04.png';
import badImg from '../../assets/img/character_02.png';
import veryBadImg from '../../assets/img/character_03.png';
import classNames from 'classnames';

const { icon, grade, average, good, normal, bad, veryBad } = styles;

const DustData = ({ inputRegion }) => {
  const API_URL = `http://localhost:8181/dustInfo/dustApi/${inputRegion}`;

  const [dustData, setDustData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDustData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const res = await axiosInstance.get(API_URL);
        const data = res.data;
        setDustData(data);
        console.log(data);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDustData();
  }, [API_URL]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <div className={icon}>
            {dustData.grade === '좋음' && <img src={goodImg} width='149px' />}
            {dustData.grade === '보통' && <img src={normalImg} width='150px' />}
            {dustData.grade === '나쁨' && <img src={badImg} width='150px' />}
            {dustData.grade === '매우나쁨' && (
              <img src={veryBadImg} width='150px' />
            )}
          </div>
          <div className={average}>{dustData.average} ㎍/㎥</div>
          <div
            className={classNames(grade, {
              [good]: dustData.grade === '좋음',
              [normal]: dustData.grade === '보통',
              [bad]: dustData.grade === '나쁨',
              [veryBad]: dustData.grade === '매우나쁨',
            })}
          >
            {dustData.grade}
          </div>
        </>
      )}
    </>
  );
};

export default DustData;
