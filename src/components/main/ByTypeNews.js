import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/ByTypeNews.module.scss';

const ByTypeNews = () => {
  const { newsContainer, newsTitle, itemContainer } = styles;
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
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
      </ul>
    </div>
  );
};

export default ByTypeNews;
