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
import { NAVER_MAP_URL } from '../../config/Naver-config';
import { Container as MapDiv, NavermapsProvider } from 'react-naver-maps';
import NaverMapApi from './NaverMapApi';
import { localDowntown } from './localDowntownInfo';

const NAVER_API = API_BASE_URL + '/restaurant';

// const loadScript = (src, callback) => {
//   const script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = src;
//   script.onload = () => callback();
//   document.head.appendChild(script);
// };

const Restaurant = () => {
  const { isLoggedIn, userEmail, regionName, onLogout } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const myRegion = localStorage.getItem('REGION_NAME');

  const [myDowntown, setMyDowntown] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [restList, setRestList] = useState([]); // 검색 결과 식당 리스트

  const [selectedRegion, setSelectedRegion] = useState(''); // 선택한 하위 지역
  const [selectedMenu, setSelectedMenu] = useState(''); // 선택한 메뉴

  const [findX, setFindX] = useState(37.5139138); // x좌표 37.3595704
  const [findY, setFindY] = useState(127.105399); // y좌표 127.105399
  const [coordList, setCoordList] = useState([]); // 검색한 식당의 좌표 리스트

  const [dishImgs, setDishImgs] = useState([]); // 메뉴 이미지

  let naverKey = 0;

  // 지역 선택 핸들러
  const onSelectRegion = (e) => {
    const sel = e.target.textContent;
    setSelectedRegion(sel);
  };

  // 메뉴 선택 핸들러
  const onSelectMenu = (e) => {
    const sel2 = e.target.textContent;
    setSelectedMenu(sel2);
  };

  // 검색하기
  const submitKeywords = () => {
    fetchRestaurant();

    // 이미지 불러오기
    fetchDishImg();
  };

  // 식당 검색 불러오기
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

  // 이미지 불러오기
  const fetchDishImg = async () => {
    try {
      console.log('GET url: ', NAVER_API + '/image/' + selectedMenu);
      const res = await axiosInstance.get(NAVER_API + '/image/' + selectedMenu);
      const getDishImgs = await res.data;
      console.log('getDishImgs: ', getDishImgs);
      setDishImgs(getDishImgs);
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  useEffect(() => {
    if (!myRegion) {
      // 로그인 안한 유저
      setMyDowntown(localDowntown['전국']);
    } else {
      setMyDowntown(localDowntown[myRegion]);
    }
    console.log('내 지역 번화가: ', myDowntown);
  }, [myDowntown]);

  useEffect(() => {
    if (restList.length > 0) {
      setCoordList([]);
      restList.forEach((rest) => {
        setCoordList((prev) => [
          ...prev,
          { x: rest.mapx / 1e7, y: rest.mapy / 1e7 },
        ]);
      });
    }
  }, [restList]);

  useEffect(() => {
    if (dishImgs.length > 0)
      console.log('이미지 링크: ', dishImgs[0].thumbnail);
  }, [dishImgs]);

  // useEffect(() => {
  //   console.log('cliend id is ', process.env.NAVER_MAP_API_KEY);
  // }, []);

  // 지도 옵션 설정
  // let map = null;

  // function initMap() {
  //   map = new naver.maps.Map('map', {
  //     center: new naver.maps.LatLng(37.3595704, 127.105399),
  //     zoom: 10,
  //   });
  // }

  // 위도, 경도가 바뀔 때 지도를 렌더링
  // useEffect(() => {
  //   if (typeof naver === 'undefined') {
  //     loadScript(
  //       `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_URL}`,
  //       initMap,
  //     );
  //   } else {
  //     initMap();
  //   }
  // }, []);

  if (errMsg) {
    return <div>{errMsg}</div>;
  }

  window.navermap_authFailure = function () {
    // 인증 실패 시 처리 코드 작성
    console.log('네이버 인증 실패');
  };

  const clickCoord = (coords) => {
    const clickedX = coords.mapx / 1e7;
    const clickedY = coords.mapy / 1e7;
    console.log('coords: ', clickedX, clickedY);
    setFindX(clickedX);
    setFindY(clickedY);
    console.log('set: ', findX, findY);
  };

  return (
    <div className={`aspect-ratio ${styles.restPage}`}>
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
        {myDowntown.length > 0 &&
          myDowntown.map((downtown) => (
            <div key={downtown} className={styles.tag} onClick={onSelectRegion}>
              {downtown}
            </div>
          ))}
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
        <div className={styles.tag} onClick={onSelectMenu}>
          삼겹살
        </div>
      </div>
      <main className={styles.popularRestContainer}>
        <h2>
          {myRegion} 맛집 <RestaurantIcon />{' '}
        </h2>
        <ul>
          {restList.map((rest) => (
            <li
              key={naverKey++}
              className={styles.restaurant}
              style={{
                backgroundImage: `url(${dishImgs.length > 0 ? dishImgs[naverKey % 5].thumbnail : ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div
                className={styles.title}
                onClick={() => {
                  window.location.href = rest.link;
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(rest.title),
                }}
              />
              <div>{rest.category}</div>
              <div
                className={styles.address}
                onClick={() => clickCoord({ mapx: rest.mapx, mapy: rest.mapy })}
              >
                {rest.roadAddress}
              </div>
            </li>
          ))}
        </ul>
        {/* <div id='map' style={{ width: '100%', height: '400px' }}></div> */}
      </main>
      <NaverMapApi coordX={findX} coordY={findY} coordList={coordList} />
    </div>
  );
};

export default Restaurant;
