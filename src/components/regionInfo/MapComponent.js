import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ searchParams, coordX, coordY }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);

  // let map = new navermaps.Map('map', {
  //   center: new navermaps.LatLng(37.3595316, 127.1052133),
  //   zoom: 16,
  //   mapTypeControl: true,
  // });

  const center = new navermaps.LatLng(37.5666805, 126.9784147);

  // const center = new navermaps.LatLng(37.5666805, 126.9784147);

  useEffect(() => {
    const jeju = new navermaps.LatLng(coordX, coordY);
    // const jeju = new navermaps.LatLng(33.3590628, 126.534361);
    // navermaps.setCenter(jeju);

    // map.setCenter(jeju);

    console.log('center: ', center);
  }, [coordX]);

  return <NaverMap defaultCenter={center} defaultZoom={16} ref={setMap} />;
}

export default MapComponent;
