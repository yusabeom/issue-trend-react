import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ searchParams, coordX, coordY }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(
    new navermaps.Map('map', {
      center: new navermaps.LatLng(37.5666805, 126.9784147),
      setCenter: () => {},
      zoom: 9,
    }),
  );

  const center = new navermaps.LatLng(37.5666805, 126.9784147);

  useEffect(() => {
    console.log('coordX: ', coordX);
    console.log('coordY: ', coordY);
    const jeju = new navermaps.LatLng(coordX, coordY);
    // map.setCenter(jeju);
  }, [coordX]);

  return <NaverMap defaultCenter={center} defaultZoom={9} ref={setMap} />;
}

export default MapComponent;
