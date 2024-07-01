import React, { useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import styles from '../../styles/Title.module.scss';
import axiosInstance from '../../config/axios-config';
import axios from 'axios';
import img1 from '../../assets/img/news3.jpg';
import img2 from '../../assets/img/news5.jpg';
import img3 from '../../assets/img/news8.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Title = () => {
  const { background, title } = styles;
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8181/issue-trend/todayArticles';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_BASE_URL);
        const originalData = response.data;
        const filteredData = originalData.filter(
          (article) => article.img !== '이미지를 찾을 수 없습니다',
        );
        setImgData(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(imgData);

  return (
    <>
      <div className={title}>이슈 트렌드의 최신 뉴스를 만나보세요</div>
      <div className={background}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={20}
          slidesPerView={8}
          autoplay={{ delay: 3000 }}
          loop
        >
          {imgData.map((data) => (
            <SwiperSlide>
              <img src={data.img} alt='뉴스1' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Title;
