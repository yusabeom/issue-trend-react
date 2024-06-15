import React, { useEffect, useState } from 'react';
import ReportList from './ReportList';
import IssueReport from './IssueReport';
import { useSearchParams } from 'react-router-dom';

// /report?page=xx&size=20
const ReportTemplate = () => {
  const [boardList, setBoardList] = useState([]); // 전체 게시물 수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [pageBoardList, setPageBoardList] = useState([]); // 페이징 데이터

  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1; // 현재 페이지
  const size = +searchParams.get('size') || 20; // amound (페이지 당 게시물 개수)

  useEffect(() => {
    // 더미 데이터 생성
    const newBoardList = [];
    for (let i = 0; i < 50; i++) {
      newBoardList.push({
        id: i + 1,
        title: `${i + 1}번째 게시물`,
        writer: `${i + 1}번째 작성자`,
        region: i % 2 === 0 ? '서울' : '부산',
        datetime: '2024-06-14',
      });
    }
    setBoardList(newBoardList);
  }, []);

  useEffect(() => {
    // console.log('boardList: ', boardList);
    // console.log('page: ', page);
    // console.log('size: ', size);

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
    /*
      1페이지면 1 ~ 20
      2페이지면 21 ~ 40
      3페이지면 41 ~ 60
      10페이지면 181 ~ 200
      n페이지면 20 * (page - 1) + 1 ~ 20 * page
      */

    // console.log('pageBoardList: ', pageBoardList);
  }, [boardList, page, size]);

  return (
    <div>
      <IssueReport />
      <ReportList
        boardList={pageBoardList}
        size={size}
        count={totalPages}
        page={page}
      />
    </div>
  );
};

export default ReportTemplate;
