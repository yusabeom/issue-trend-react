import React, { useEffect, useRef, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ searchParams, coordX, coordY, coordList }) {
  const navermaps = useNavermaps();
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // let map = new navermaps.Map('map', {
  //   center: new navermaps.LatLng(37.3595316, 127.1052133),
  //   zoom: 16,
  //   mapTypeControl: true,
  // });

  useEffect(() => {
    const newCenter = new navermaps.LatLng(coordY, coordX);

    console.log('좌표: ', coordX, coordY);
    mapRef.current.setCenter(newCenter);

    console.log('center: ', newCenter);
  }, [coordX]);

  useEffect(() => {
    console.log('coordList: ', coordList);
    if (coordList.length > 0) {
      console.log('검색된 모든 주소의 좌표값: ', coordList);
      const newCenter = new navermaps.LatLng(coordList[0].y, coordList[0].x);
      mapRef.current.setCenter(newCenter);
    }
  }, [coordList]);

  return (
    <NaverMap
      defaultCenter={
        coordList.length > 0
          ? new navermaps.LatLng(coordList[0].y, coordList[0].x)
          : new navermaps.LatLng(37.4820858, 126.881974) // 가산
      }
      center={
        coordList.length > 0
          ? new navermaps.LatLng(coordY, coordX)
          : new navermaps.LatLng(37.4820858, 126.881974) // 가산
      }
      defaultZoom={16}
      zoomControl={true}
      ref={mapRef}
    >
      {coordList.length > 0 &&
        coordList.map((coordinate) => {
          return (
            <Marker
              position={new navermaps.LatLng(coordinate.y, coordinate.x)}
            />
          );
        })}
    </NaverMap>
  );
}

export default MapComponent;
