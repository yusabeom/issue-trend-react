import React from 'react';
import {
  NavermapsProvider,
  useNavermaps,
  Container as MapDiv,
} from 'react-naver-maps';
import { naverClientId } from '../../config/Naver-config';
import MapComponent from './MapComponent';

function NaverMapApi({ searchParams, coordX, coordY }) {
  const id = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  console.log(naverClientId);

  return (
    <MapDiv style={{ height: 400 }}>
      <NavermapsProvider ncpClientId={id} submodules={['geocoder']}>
        <MapComponent coordX={coordX} coordY={coordY} />
      </NavermapsProvider>
    </MapDiv>
  );
}

export default NaverMapApi;
