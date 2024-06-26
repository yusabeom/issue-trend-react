import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios-config';

const DustData = ({ inputRegion }) => {
  const API_URL = `http://localhost:8181/dustInfo/dustApi/${inputRegion}`;

  const [dustData, setDustData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDustData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const res = await axiosInstance.get(API_URL);
        const data = res.data;
        setDustData(data);
        console.log(data);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDustData();
  }, [API_URL]);

  return <div>DustData</div>;
};

export default DustData;
