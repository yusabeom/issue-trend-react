import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../config/axios-config';
import { API_BASE_URL, USER } from '../../../config/host-config';
import styles from '../../../styles/user/WritePost.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import Pagination from 'react-js-pagination';

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
      <div className={styles.title}>
        <h2>내가 작성한 글</h2>
      </div>
      {formattedPost.length === 0 ? (
        <div className={styles.emptyMessage}>작성한 글이 없습니다.</div>
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.tableStyle}>
            <table>
              <thead>
                <tr>
                  <th className={styles.postNo}>포스트 번호</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, index) => (
                  <tr key={index} onClick={() => clickPost(post.postNo)}>
                    <td className={styles.postNo}>{post.postNo}</td>
                    <td>{post.title}</td>
                    <td>{post.text}</td>
                    <td>{post.formatDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {formattedPost.length > 0 && (
        <div className={styles.paginationContainer}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={formattedPost.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass={styles.pageItem}
            linkClass={styles.pageLink}
            innerClass={styles.pagination}
            activeClass={styles.active}
            prevPageText={<FaChevronLeft />}
            nextPageText={<FaChevronRight />}
            firstPageText={<FaAngleDoubleLeft />}
            lastPageText={<FaAngleDoubleRight />}
          />
        </div>
      )}
    </>
  );
};

export default WritePost;
