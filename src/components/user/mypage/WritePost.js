import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/RecentPost.module.scss';
import img from '../../../assets/img/news3.jpg';
import AuthContext from '../../store/auth-context';
import { API_BASE_URL, USER } from '../../../config/host-config';

const { title, post, postContent } = styles;

const WritePost = () => {
  const [posts, setPosts] = useState([]);
  const { userNo } = useContext(AuthContext);
  // 서버가 응답하는 결과물: List<PostResponseDTO>
  console.log(`userNo: ${userNo}`); // 30
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${USER}/search-post-user/${userNo}`,
        );
        if (!response.ok) {
          console.log('Failed to fetch user posts');
          throw new Error('Failed to fetch user posts');
        }
        const data = await response.json();
        console.log(`data: `, data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchMyPosts();
  }, []);

  console.log(posts);
  console.log([...posts]);
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
