import React, { useEffect, useState } from 'react';
import ReportList from './ReportList';
import IssueReport from './IssueReport';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, USER } from '../../config/host-config';

const ARTICLE = API_BASE_URL + USER;

// /report?page=xx&size=20
const ReportTemplate = () => {
  const [boardList, setBoardList] = useState([]); // 전체 게시물
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [pageBoardList, setPageBoardList] = useState([]); // 페이징 데이터 (현재 페이지의 게시물)

  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1; // 현재 페이지
  const size = +searchParams.get('size') || 20; // amound (페이지 당 게시물 개수)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('GET 요청 url: ', ARTICLE + '/search-post');
        const res = await axios.get(ARTICLE + '/search-post');
        const getBoardList = await res.data;

        setBoardList(getBoardList);
      } catch (error) {
        // console.error('Error fetching data: ', error);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /*
  useEffect(() => {
    // 전체 페이지 수 = 전체 게시물 수 / 페이지 당 게시물 수
    const totalPageCount = Math.ceil(boardList.length / size);
    setTotalPages(totalPageCount);
    console.log('totalPageCount: ', totalPageCount);

    if (boardList.length > 0) {
      const filteredList = boardList.filter(
        (board) => board.id >= (page - 1) * size + 1 && board.id <= page * size,
      );
      setPageBoardList(filteredList);
    }

      1페이지면 1 ~ 20
      2페이지면 21 ~ 40
      3페이지면 41 ~ 60
      10페이지면 181 ~ 200
      n페이지면 20 * (page - 1) + 1 ~ 20 * page
  

    // console.log('pageBoardList: ', pageBoardList);
  }, [boardList, page, size]);
  */

  return (
    <div>
      <IssueReport />
      <ReportList
        boardList={boardList}
        size={size}
        count={totalPages}
        page={page}
      />
    </div>
  );
};

export default ReportTemplate;
