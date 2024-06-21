import React from 'react';
import styles from '../../../styles/RecentPost.module.scss';
import img from '../../../assets/img/news3.jpg';

const { title, post, postContent } = styles;

const WritePost = () => {
  return (
    <>
      <div className={title}>내가 작성한 글</div>
      <div className={post}>
        <img src={img} />
        <ul className={postContent}>
          <li>제목</li>
          <li>내용</li>
        </ul>
      </div>
      <div className={post}>
        <img src={img} />
        <ul className={postContent}>
          <li>제목</li>
          <li>내용</li>
        </ul>
      </div>
    </>
  );
};

export default WritePost;
