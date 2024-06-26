import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import { API_BASE_URL, USER } from '../../config/host-config';
import axiosInstance from '../../config/axios-config';
import styles from '../../styles/Restaurant.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

const NAVER_API = API_BASE_URL + '/restaurant';

const Restaurant = () => {
  const { isLoggedIn, userEmail, regionName, onLogout } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const myRegion = localStorage.getItem('REGION_NAME');
  const [errMsg, setErrMsg] = useState('');
  const [restList, setRestList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(''); // 선택한 하위 지역
  const [selectedMenu, setSelectedMenu] = useState(''); // 선택한 메뉴
  let naverKey = 0;

  // 지역 선택 핸들러
  const onSelectRegion = (e) => {
    // console.log(e.target.textContent);
    setSelectedRegion(e.target.textContent);
  };

  // 메뉴 선택 핸들러
  const onSelectMenu = (e) => {
    // console.log(e.target.textContent);
    setSelectedMenu(e.target.textContent);
  };

  // 검색하기
  const submitKeywords = () => {
    fetchRestaurant();
  };

  const fetchRestaurant = async () => {
    try {
      console.log(
        'GET url: ',
        NAVER_API + '/' + selectedRegion + ' ' + selectedMenu,
      );
      const res = await axiosInstance.get(
        NAVER_API + '/' + selectedRegion + ' ' + selectedMenu,
      );
      const restaurants = await res.data;
      console.log('restaurants: ', restaurants);
      setRestList(restaurants);
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  useEffect(() => {}, []);

  if (errMsg) {
    return <div>{errMsg}</div>;
  }

  // 지도 옵션 설정
  let map = null;

  function initMap() {
    map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  }

  window.navermap_authFailure = function () {
    // 인증 실패 시 처리 코드 작성
    console.log('네이버 인증 실패');
  };

  return (
    <>
      <header className={styles.searchArea}>
        <div className={styles.keywords}>
          {selectedRegion && (
            <div className={styles.searchRegion}>{selectedRegion}</div>
          )}
          {selectedMenu && (
            <div className={styles.searchMenu}>{selectedMenu}</div>
          )}
        </div>

        {selectedRegion && selectedMenu && (
          <div className={styles.searchButton}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size='2x'
              onClick={submitKeywords}
            />
          </div>
        )}
      </header>

      <div className={styles.regionTags}>
        <div className={styles.tag} onClick={onSelectRegion}>
          강남
        </div>
        <div className={styles.tag} onClick={onSelectRegion}>
          신촌
        </div>
        <div className={styles.tag} onClick={onSelectRegion}>
          명동
        </div>
        <div className={styles.tag} onClick={onSelectRegion}>
          건대
        </div>
        <div className={styles.tag} onClick={onSelectRegion}>
          노량진
        </div>
      </div>
      <div className={styles.foodTags}>
        <div className={styles.tag} onClick={onSelectMenu}>
          돈가스
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          냉면
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          짜장면
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          김치찌개
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          마라탕
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          햄버거
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          해물찜
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          막국수
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          닭갈비
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          육개장
        </div>
        <div className={styles.tag} onClick={onSelectMenu}>
          조개구이
        </div>
      </div>
      <main className={styles.popularRestContainer}>
        <h2>
          {myRegion} 맛집 <RestaurantIcon />{' '}
        </h2>
        <ul>
          {restList.map((rest) => (
            <li key={naverKey++} className={styles.restaurant}>
              <div
                className={styles.title}
                onClick={() => {
                  navigate(rest.link);
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(rest.title),
                }}
              />
              <p>{rest.category}</p>
              <p>{rest.roadAddress}</p>
            </li>
          ))}
        </ul>
        <div id='map' style='width:100%;height:400px;'></div>
      </main>
    </>
  );
};

export default Restaurant;
