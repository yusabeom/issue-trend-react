import React, { useState } from 'react';
import styles from '../../styles/RegionScreen.module.scss';
import { BiNews } from 'react-icons/bi';
import Weather from './Weather';
import Dust from './Dust';
import Crime from './Crime';
import classNames from 'classnames';
import Restaurant from './Restaurant';

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
      <>
        <div className={title}>
          <h1>지역별 정보</h1>
          <h2>
            지역별 다양한 정보를 확인 할 수 있습니다. (날씨, 미세먼지, 지역맛집,
            범죄발생)
          </h2>
        </div>
        <div className={regionContainer}>
          <div className={tag}>
            <p
              onClick={weather}
              className={classNames({
                [activeWeather]:
                  tagChange === 'weather' || tagChange === 'basic',
              })}
            >
              날씨
            </p>
            <p
              onClick={dust}
              className={tagChange === 'dust' ? activeDust : ''}
            >
              미세먼지
            </p>
            <p
              onClick={restaurant}
              className={tagChange === 'restaurant' ? activeRestaurant : ''}
            >
              지역맛집
            </p>
            <p
              onClick={crime}
              className={tagChange === 'crime' ? activeCrime : ''}
            >
              범죄
            </p>
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
                <p>
                  지역별 맛집 정보를 확인하실 수 있습니다.(자료 출처: 네이버
                  지도)
                </p>
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
              <div className={styles.restBox}>
                <Restaurant />
              </div>
            )}
            {tagChange === 'crime' && (
              <p>
                <Crime />
              </p>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default RegionScreen;
