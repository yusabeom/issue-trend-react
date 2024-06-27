import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ searchParams, coordX, coordY }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [latLng, setLatLng] = useState({ rat: 32.5670182, lng: 126.9815009 });

  // let map = new navermaps.Map('map', {
  //   center: new navermaps.LatLng(37.3595316, 127.1052133),
  //   zoom: 16,
  //   mapTypeControl: true,
  // });

  const center = new navermaps.LatLng(latLng.rat, latLng.lng);

  // const center = new navermaps.LatLng(37.5666805, 126.9784147);
  let jeju;
  useEffect(() => {
    // console.log(map);
    jeju = new navermaps.LatLng(coordX, coordY);
    // const jeju = new navermaps.LatLng(33.3590628, 126.534361);
    // navermaps.setCenter(jeju);
    console.log('작동!');
    setLatLng({ rat: coordX, lng: coordY });

    console.log('center: ', center);
  }, [coordX]);

  return <NaverMap center={center} defaultZoom={16} />;
}

export default MapComponent;
