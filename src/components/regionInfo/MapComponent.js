import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ searchParams, coordX, coordY }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const center = new navermaps.LatLng(37.5666805, 126.9784147);

  useEffect(() => {
    const jeju = new navermaps.LatLng(coordX, coordY);
    map.setCenter(jeju);
  }, [coordX]);

  return (
    <NaverMap defaultCenter={center} defaultZoom={9} ref={setMap}>
      <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
    </NaverMap>
  );
}

export default MapComponent;
