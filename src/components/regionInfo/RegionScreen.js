import React, { useState } from 'react';
import styles from '../../styles/RegionScreen.module.scss';
import { BiNews } from 'react-icons/bi';
import Weather from './Weather';
import Dust from './Dust';
import { Restaurant } from '@mui/icons-material';
import Crime from './Crime';
import classNames from 'classnames';

const RegionScreen = () => {
  const {
    icon,
    regionContainer,
    title,
    tag,
    tagBox,
    content,
    activeDust,
    activeWeather,
    activeRestaurant,
    activeCrime,
  } = styles;

  const [tagChange, setTagChange] = useState('basic');

  const weather = () => {
    setTagChange('weather');
  };

  const dust = () => {
    setTagChange('dust');
  };
  const restaurant = () => {
    setTagChange('restaurant');
  };
  const crime = () => {
    setTagChange('crime');
  };

  return (
    <>
      <div className='aspect-ratio'>
        <div className={regionContainer}>
          <h1 className={title}>
            <BiNews className={icon} />
            ㅤ지역별 정보
          </h1>
          <div className={tag}>
            <p onClick={weather}>날씨</p>
            <p onClick={dust}>미세먼지</p>
            <p onClick={restaurant}>지역맛집</p>
            <p onClick={crime}>범죄발생</p>
          </div>
          <div
            className={classNames(tagBox, {
              [activeDust]: tagChange === 'dust',
              [activeWeather]: tagChange === 'weather',
              [activeRestaurant]: tagChange === 'restaurant',
              [activeCrime]: tagChange === 'crime',
            })}
          >
            {tagChange === 'dust' && (
              <>
                <h2>지역별 미세먼지</h2>
                <p>
                  지역별 미세먼지 정보 및 관련기사를 확인하실 수 있습니다.(자료
                  출처: 에어코리아)
                </p>
              </>
            )}
            {tagChange === 'weather' && (
              <>
                <h2>지역별 날씨</h2>
                <p>지역별 날씨 정보를 확인하실 수 있습니다.(자료 출처: )</p>
              </>
            )}
            {tagChange === 'basic' && (
              <>
                <h2>지역별 날씨</h2>
                <p>지역별 날씨 정보를 확인하실 수 있습니다.(자료 출처: )</p>
              </>
            )}
            {tagChange === 'restaurant' && (
              <>
                <h2>지역 맛집</h2>
                <p>지역별 맛집 정보를 확인하실 수 있습니다.(자료 출처: )</p>
              </>
            )}
            {tagChange === 'crime' && (
              <>
                <h2>지역별 범죄현황</h2>
                <p>
                  지역별 범죄현황을 확인하실 수 있습니다.(자료 출처: 경찰청)
                </p>
              </>
            )}
          </div>
          <div className={content}>
            {tagChange === 'weather' && (
              <p>
                <Weather />
              </p>
            )}
            {tagChange === 'basic' && (
              <p>
                <Weather />
              </p>
            )}
            {tagChange === 'dust' && (
              <p>
                <Dust />
              </p>
            )}
            {tagChange === 'restaurant' && (
              <p>
                <Restaurant />
              </p>
            )}
            {tagChange === 'crime' && (
              <p style={{ width: '600px', height: '600px' }}>
                <Crime />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionScreen;
