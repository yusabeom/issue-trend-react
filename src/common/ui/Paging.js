import { Pagination, TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// curPage: 현재 페이지, size: 페이지 당 게시물 개수, count : 전체 페이지 수
const Paging = ({ size, count, curPage, type }) => {
  // const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);
  // const [totalPages, setTotalPages] = useState(10); // 총 페이지 수

  const navigate = useNavigate();
  useEffect(() => {
    console.log('size: ', size);
    console.log('count: ', count);
    console.log('curPage: ', curPage);
  }, []);

  // useEffect(() => {
  // 페이지가 변경될 때마다 데이터 가져오기
  /*
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.example.com/data?page=${page}`,
        );
        setData(response.data.items); // 데이터 설정
        setTotalPages(response.data.totalPages); // 총 페이지 수 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    */
  // }, [page]);

  // 페이지 버튼 클릭 이벤트 핸들러
  const handlePageChange = (e, value) => {
    // setPage(value); // 해당 버튼 페이지로 이동
    navigate(`/${type}?page=${value}`);
  };

  return (
    <Pagination
      count={count}
      page={+curPage}
      onChange={handlePageChange}
      color='secondary'
    />
    // <TablePagination
    //   component='div'
    //   count={count}
    //   page={curPage}
    //   onPageChange={handlePageChange}
    //   rowsPerPage={size}
    //   // onRowsPerPageChange={handleChangeRowsPerPage}
    // />
  );
};

export default Paging;
