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
import { API_BASE_URL, USER } from '../../config/host-config';
const API_BASE_URL2 = API_BASE_URL + USER + '/todayArticles';

const Title = () => {
  const { container, head, background, title } = styles;
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_BASE_URL2);
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

  const clickImg = (e) => {
    const targetUrl = e.target.getAttribute('data-url');
    console.log(targetUrl);

    if (targetUrl) {
      window.open(targetUrl, '_blank');
    }
  };

  return (
    <div className={container}>
      <div className={head}></div>
      <div className={title}>
        <h1>여러분들의 제보, 참여가 이슈트렌드를 만듭니다.</h1>
        <p>이슈 트렌드의 최신 뉴스를 만나보세요.</p>
      </div>
      <div className={background}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={20}
          slidesPerView={8}
          autoplay={{ delay: 2000 }}
          loop
        >
          {imgData.map((data, index) => (
            <SwiperSlide key={index}>
              <img
                src={data.img}
                data-url={data.articleLink}
                alt='뉴스1'
                onClick={clickImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Title;
