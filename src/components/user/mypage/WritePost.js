import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/RecentPost.module.scss';
import img from '../../../assets/img/news3.jpg';
import AuthContext from '../../store/auth-context';
import { API_BASE_URL, USER } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';

const { title, post, postContent } = styles;

const WritePost = () => {
  // 가져온 List<PostResponseDTO> 중 내가 원하는 데이터만 가져오기
  const [formattedPost, setFormattedPost] = useState([
    {
      title: '',
      text: '',
      formatDate: '',
      postNo: '',
    },
  ]);
  const { userNo } = useContext(AuthContext);
  // 서버가 응답하는 결과물: List<PostResponseDTO>
  console.log(`userNo: ${userNo}`); // 30
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_BASE_URL}${USER}/search-post-user`,
        );
        if (!response.ok) {
          console.log('Failed to fetch user posts');
          throw new Error('Failed to fetch user posts');
        }
        const data = await response.json();
        console.log(`data: `, data);

        const formatPosts = data.map((post) => ({
          title: post.title,
          text: post.text,
          formatDate: post.formatDate,
          postNo: post.postNo,
        }));

        setFormattedPost(formatPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchMyPosts();
  }, [userNo]);

  const clickPost = () => {};

  console.log('formattedPosts: ', formattedPost);
  return (
    <>
      <div className={title}>
        내가 작성한 글
        {formattedPost.length === 0 ? (
          <div>0</div>
        ) : (
          formattedPost.map((post, index) => (
            <div className='post' key={index} onClick={clickPost}>
              <ul className='postContent'>
                <li>제목: {post.title}</li>
                <li>내용: {post.text}</li>
                <li>작성일: {post.formatDate}</li>
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default WritePost;
