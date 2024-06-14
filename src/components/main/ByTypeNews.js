import React from 'react';
import styles from '../../styles/ByTypeNews.module.scss';
import news1 from '../../assets/img/news1.jpg';
import news2 from '../../assets/img/news2.jpg';
import news3 from '../../assets/img/news3.jpg';
import news4 from '../../assets/img/news4.jpg';
import news5 from '../../assets/img/news5.jpg';
import news6 from '../../assets/img/news6.jpg';
import news7 from '../../assets/img/news7.jpg';
import news8 from '../../assets/img/news8.jpg';
import news9 from '../../assets/img/news9.jpg';

const ByTypeNews = () => {
  const { newsContainer, newsTitle, itemContainer } = styles;

  const articles = [
    {
      articleCode: 123334,
      img: news1,
    },
    {
      articleCode: 12343534,
      img: news2,
    },
    {
      articleCode: 12334235334,
      img: news3,
    },
    {
      articleCode: 12321323334,
      img: news4,
    },
    {
      articleCode: 11235523334,
      img: news5,
    },
    {
      articleCode: 12333234234,
      img: news6,
    },
    {
      articleCode: 1231234656334,
      img: news7,
    },
    {
      articleCode: 12396754334,
      img: news8,
    },
    {
      articleCode: 12334326734,
      img: news9,
    },
  ];

  return (
    <div>
      <select className={newsTitle}>
        <option value=''>선택</option>
        <option value='서울특별시'>서울특별시</option>
        <option value='부산광역시'>부산광역시</option>
        <option value='대구광역시'>대구광역시</option>
        <option value='인천광역시'>인천광역시</option>
        <option value='광주광역시'>광주광역시</option>
        <option value='대전광역시'>대전광역시</option>
        <option value='울산광역시'>울산광역시</option>
        <option value='세종특별자치시'>세종특별자치시</option>
        <option value='경기도'>경기도</option>
        <option value='강원도'>강원도</option>
        <option value='충청북도'>충청북도</option>
        <option value='충청남도'>충청남도</option>
        <option value='전라북도'>전라북도</option>
        <option value='전라남도'>전라남도</option>
        <option value='경상북도'>경상북도</option>
        <option value='경상남도'>경상남도</option>
        <option value='제주특별자치도'>제주특별자치도</option>
      </select>

      <ul className={itemContainer}>
        {articles.map((news) => (
          <li
            key={news.articleCode}
            style={{ backgroundImage: `url(${news.img})` }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default ByTypeNews;
