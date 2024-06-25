import {
  Alert,
  Box,
  Input,
  MenuItem,
  TextField,
  debounce,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Select from '../../common/ui/Select';
import styles from '../../styles/Filter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { SearchRounded } from '@mui/icons-material';
import { KeywordContext } from '../../utils/KeywordContext';

const Filter = ({ onTags, agencies }) => {
  const [inputValue, setInputValue] = useState(''); // 키워드 검색창에다 입력한 값
  const [searchValue, setSearchValue] = useState(''); // 검색한 키워드
  const [keywordMsg, setKeywordMsg] = useState('0'); // 키워드 검색창에 입력한 값의 길이
  const [openAlert, setOpenAlert] = useState(false); // 검색어 alert 메세지 여부
  const [submitTags, setSubmitTags] = useState({
    // 서버에 제출할 태그
    region: null,
    keyword: null,
    sort: null,
    agency: null,
  });

  const { mainKeyword, setMainKeyword } = useContext(KeywordContext);
  // console.log(mainKeyword);

  const optionsRegion = {
    se: '서울',
    in: '인천',
    kk: '경기',
    bu: '부산',
    ul: '울산',
    kn: '경남',
    da: '대구',
    kb: '경북',
    ku: '광주',
    jn: '전남',
    jj: '제주',
    jb: '전북',
    kw: '강원',
    dj: '대전',
    cb: '충북',
    cn: '충남',
    sj: '세종',
  };

  const [optionsUploadTime, setOptionsUploadTime] = useState(null);

  const optionsSort = {
    recent: '최신순',
    replies: '댓글순',
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    // console.log('agencies: ', agencies);
    const obj = agencies.reduce((acc, item, index) => {
      acc[index + 1] = item;
      return acc;
    }, {});

    setOptionsUploadTime(obj);
    // console.log('obj: ', obj);
  }, [agencies]);

  function isEnglish(str) {
    return /^[A-Za-z]+$/.test(str);
  }

  // 태그에 요소 추가
  const addNewTag = (key) => {
    // filter-tag 태그에 새로운 태그 붙이기
    // console.log('key: ', key);

    // const content = optionsRegion[key];
    // console.log('content: ', optionsRegion[key]);

    if (key.length > 5 && tags.some((tag) => tag.length > 5)) {
      // 정렬은 하나만 추가 가능
      setTags((prevTags) => [
        ...prevTags.filter((tag) => tag !== 'recent' && tag !== 'replies'),
        key,
      ]);
      setSubmitTags((prevData) => ({
        ...prevData,
        sort: optionsSort[key],
      }));
    } else if (key.length === 2 && tags.some((tag) => tag.length === 2)) {
      // 지역은 하나만 추가 가능
      setTags((prevTags) => [
        ...prevTags.filter((tag) => tag.length !== 2),
        key,
      ]);
      setSubmitTags((prevData) => ({
        ...prevData,
        region: optionsRegion[key],
      }));
    } else if (!isNaN(key) && tags.some((tag) => !isEnglish(tag))) {
      // 언론사는 하나만 추가 가능
      setTags((prevTags) => [
        ...prevTags.filter((tag) => isEnglish(tag)),
        optionsUploadTime[key],
      ]);
      setSubmitTags((prevData) => ({
        ...prevData,
        agency: optionsUploadTime[key],
      }));
    } else if (!tags.some((tag) => tag === key)) {
      // 만약 배열에 넣으려는 값이 이미 존재하지 않을 때만 요소를 배열에 추가

      if (key.length > 5) {
        // 정렬
        setTags((prevTags) => [...prevTags, key]);
        setSubmitTags((prevData) => ({
          ...prevData,
          sort: optionsSort[key],
        }));
      } else if (key.length === 2) {
        // 지역
        setTags((prevTags) => [...prevTags, key]);
        setSubmitTags((prevData) => ({
          ...prevData,
          region: optionsRegion[key],
        }));
      } else if (!isNaN(key)) {
        // 언론사
        setTags((prevTags) => [...prevTags, optionsUploadTime[key]]);
        setSubmitTags((prevData) => ({
          ...prevData,
          agency: optionsUploadTime[key],
        }));
      }
    }
  };

  // 태그에 있는 요소 제거
  const removeTag = (e) => {
    const content = e.target.parentElement.dataset.key;
    setTags((prevTags) => [...prevTags.filter((tag) => tag !== content)]);
  };

  // 키워드 검색 input 컴포넌트의 값이 바뀔 때 핸들러
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // let msg;
    if (inputValue.length <= 20) {
      setInputValue(inputValue);
      setKeywordMsg(inputValue.length);
      setSearchValue(inputValue);
      setSubmitTags((prevData) => ({
        ...prevData,
        keyword: inputValue,
      }));
    }
  };

  // tags = ['in', 'se', 'today'];

  // 메인화면에서 워드 클라우드 단어를 눌렀을 때
  useEffect(() => {
    console.log('mainKeyword:', mainKeyword);
    // setSearchValue(mainKeyword);
    // setSubmitTags((prevData) => ({
    //   ...prevData,
    //   keyword: mainKeyword,
    // }));
    setTimeout(() => {
      onTags({
        region: null,
        keyword: mainKeyword,
        sort: null,
        agency: null,
      });
    }, 1000);
  }, []);
  console.log('워드클라우드 -> ', submitTags);

  // 키워드 검색 input에 키워드 입력 후 엔터키를 누르거나 돋보기 아이콘을 클릭했을 때 핸들러
  const submitFilter = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // console.log('submitted tags: ', tags);
      // console.log('submitted keyword: ', searchValue);

      // 태그와 키워드가 비워져 있으면
      if (inputValue.trim() === '' && tags.length === 0) {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
        return;
      }

      if (submitTags.keyword === '' || submitTags.keyword === null) {
        setSearchValue('');
      }

      onTags(submitTags);

      setInputValue('');
      setKeywordMsg('0');
    }
  };

  // mainKeyword이 변경될 때 inputValue 업데이트
  useEffect(() => {
    setInputValue(mainKeyword);
    setMainKeyword('');
  }, [mainKeyword]);

  return (
    <>
      <div className={styles.filterTag}>
        {tags.map((tag) => (
          <div key={tag} className={styles.tag} data-key={tag}>
            {optionsRegion[tag] || optionsSort[tag] || tag}
            &nbsp;
            <FontAwesomeIcon
              className={styles.icon}
              icon={faX}
              size='xs'
              onClick={removeTag}
            />
          </div>
        ))}

        {searchValue && (
          <div className={styles.keywordTagContainer}>
            <div className={styles.keywordTag}>키워드</div>
            <span>{searchValue}</span>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faX}
              size='lg'
              onClick={() => {
                setSearchValue('');
              }}
            />
          </div>
        )}
      </div>

      <div className={styles.filter}>
        <Select
          className={styles.selection}
          placeholder={'지역'}
          options={optionsRegion}
          select={addNewTag}
        />
        <br />
        <Select
          className={styles.selection}
          placeholder={'언론사'}
          options={optionsUploadTime || { 1: '전주일보' }}
          select={addNewTag}
        />
        <br />
        <Select
          className={styles.selection}
          placeholder={'정렬'}
          options={optionsSort}
          select={addNewTag}
        />
      </div>

      <div className={styles.inputWrapper}>
        <strong> 키워드 </strong>
        <Input
          className={styles.input}
          placeholder='입력 단어가 포함된 게시물을 검색합니다.'
          variant='soft'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={submitFilter}
        />
        <span style={keywordMsg < 20 ? { color: 'green' } : { color: 'red' }}>
          {keywordMsg + '/20'}
        </span>
      </div>
      {openAlert && (
        <Alert style={{ marginTop: '1rem' }} severity='warning'>
          키워드를 입력해주세요.
        </Alert>
      )}
      <div className={styles.searchButton}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='2x'
          onClick={submitFilter}
        />
      </div>
    </>
  );
};

export default Filter;
