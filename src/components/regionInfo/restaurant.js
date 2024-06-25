import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import { API_BASE_URL, USER } from '../../config/host-config';
import axiosInstance from '../../config/axios-config';

const NAVER_API = API_BASE_URL + '/restaurant';

const Restaurant = () => {
  const { isLoggedIn, userEmail, regionName, onLogout } =
    useContext(AuthContext);

  const myRegion = localStorage.getItem('REGION_NAME');
  const [errMsg, setErrMsg] = useState('');

  const fetchRestaurant = async () => {
    try {
      console.log('GET url: ', NAVER_API + '/' + myRegion);
      const res = await axiosInstance.get(NAVER_API + '/' + myRegion);
      const restaurants = res.date;
      console.log(restaurants);
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (errMsg) {
    return <div>{errMsg}</div>;
  }

  return (
    <>
      <div>
        {myRegion} 맛집 <RestaurantIcon />{' '}
      </div>
    </>
  );
};

export default Restaurant;
