import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../config/axios-config';
import { API_BASE_URL, USER } from '../../../config/host-config';
import styles from '../../../styles/user/WritePost.module.scss';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import pageStyle from '../../../styles/user/Pagination.module.scss';

const { title } = styles;
const { paginationContainer } = pageStyle;
const { tableStyle } = styles;

const WritePost = () => {
  const navigate = useNavigate();
  const [formattedPost, setFormattedPost] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const postsPerPage = 3; // 페이지당 보여줄 게시물 수
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = formattedPost.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}${USER}/search-post-user`,
      );
      if (response.status !== 200) {
        console.log('Failed to fetch user posts');
        throw new Error('Failed to fetch user posts');
      }
      const data = response.data;

      const formatPosts = data.map((post) => ({
        title: post.title,
        text: post.text,
        formatDate: post.formatDate,
        postNo: post.postNo,
      }));

      setFormattedPost(formatPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setActivePage(pageNumber);
  };

  const clickPost = (postNo) => {
    console.log('active page is:', postNo);
    navigate(`/board/detail/${postNo}`);
  };

  return (
    <>
      <div className={title}>
        <h2>내가 작성한 글</h2>
        {formattedPost.length === 0 ? (
          <div>작성한 글이 없습니다.</div>
        ) : (
          <div className={tableStyle}>
            <table>
              <thead>
                <tr>
                  <th className={styles.postNo}>포스트 번호</th>
                  <th className={styles.title}>제목</th>
                  <th className={styles.content}>내용</th>
                  <th className={styles.writeDate}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, index) => (
                  <tr key={index} onClick={() => clickPost(post.postNo)}>
                    <td className={styles.postNo}>{post.postNo}</td>
                    <td className={styles.title}>{post.title}</td>
                    <td className={styles.content}>{post.text}</td>
                    <td className={styles.writeDate}>{post.formatDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {formattedPost.length > 0 && (
        <div className={paginationContainer}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={formattedPost.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass={pageStyle.pageItem}
            linkClass={pageStyle.pageLink}
            innerClass={pageStyle.pagination}
            activeClass={pageStyle.active}
          />
        </div>
      )}
    </>
  );
};

export default WritePost;
