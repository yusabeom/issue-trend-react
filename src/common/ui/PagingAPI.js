// import './Paging.css';
import Pagination from 'react-js-pagination';

const PagingAPI = ({ page, count, setPage }) => {

  setPage(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={10} // 한 페이지당 보여줄 게시글 갯수
      totalItemsCount={count} // 총 게시글 갯수
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage} // 페이지 변경을 핸들링하는 함수
    />
  );
};
export default PagingAPI;
