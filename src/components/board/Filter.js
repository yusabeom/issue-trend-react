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
import { faX } from '@fortawesome/free-solid-svg-icons';
import { SearchRounded } from '@mui/icons-material';
import { KeywordContext } from '../../utils/KeywordContext';

const Filter = ({ onTags }) => {
  const [inputValue, setInputValue] = useState(''); // 키워드 검색창에다 입력한 값
  const [searchValue, setSearchValue] = useState(''); // 검색한 키워드
  const [keywordMsg, setKeywordMsg] = useState('0'); // 키워드 검색창에 입력한 값의 길이
  const [openAlert, setOpenAlert] = useState(false); // 검색어 alert 메세지 여부

  const { mainKeyword } = useContext(KeywordContext);
  console.log(mainKeyword);

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

  const optionsUploadTime = {
    hour: '1시간 전',
    day: '오늘',
    week: '이번주',
  };

  const optionsSort = {
    recent: '최신순',
    relevant: '관련성',
    popular: '조회수',
  };

  const [tags, setTags] = useState([]);
  // tags = ['in', 'se', 'today'];

  // 태그가 바뀔 때마다 부모에게 전달
  useEffect(() => {
    onTags(tags, searchValue, mainKeyword);
  }, [tags, searchValue, mainKeyword]);

  // 태그에 요소 추가
  const addNewTag = (key) => {
    // filter-tag 태그에 새로운 태그 붙이기
    console.log('key: ', key);
    // const content = optionsRegion[key];
    // console.log('content: ', optionsRegion[key]);

    setTags((prevTags) => {
      if (
        ['hour', 'day', 'week'].includes(key) &&
        (prevTags.includes('hour') ||
          prevTags.includes('day') ||
          prevTags.includes('week'))
      ) {
        // 업로드 날짜는 하나만 추가 가능
        console.log('2번째 if문 실행');
        return [
          ...prevTags.filter(
            (tag) => tag !== 'hour' && tag !== 'day' && tag !== 'week',
          ),
          key,
        ];
      } else if (key.length > 5 && prevTags.some((tag) => tag.length > 5)) {
        // 정렬은 하나만 추가 가능
        return [
          ...prevTags.filter(
            (tag) =>
              tag !== 'recent' && tag !== 'relevant' && tag !== 'popular',
          ),
          key,
        ];
      } else if (!prevTags.some((tag) => tag === key)) {
        // 만약 배열에 넣으려는 값이 이미 존재하지 않을 때만 요소를 배열에 추가
        return [...prevTags, key];
      }
      return [...prevTags];
    });
    console.log('tags: ', tags);
  };

  // 태그에 있는 요소 제거
  const removeTag = (e) => {
    const content = e.target.parentElement.dataset.key;
    console.log('이벤트 발생: ', content);
    setTags((prevTags) => [...prevTags.filter((tag) => tag !== content)]);
  };

  // 키워드 검색 input 컴포넌트의 값이 바뀔 때 핸들러
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // let msg;
    if (inputValue.length <= 20) {
      setInputValue(inputValue);
      setKeywordMsg(inputValue.length);
    }
  };

  // 키워드 검색 input에 키워드 입력 후 엔터키를 눌렀을 때의 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter!!');
      if (inputValue.trim() === '') {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
        return;
      }
      setSearchValue(inputValue);
      setInputValue('');
      setKeywordMsg('0');
    }
  };

  // mainKeyword이 변경될 때 inputValue 업데이트
  useEffect(() => {
    setInputValue(mainKeyword);
  }, [mainKeyword]);

  return (
    <>
      <div className={styles.filterTag}>
        {tags.map((tag) => (
          <div key={tag} className={styles.tag} data-key={tag}>
            {optionsRegion[tag] || optionsUploadTime[tag] || optionsSort[tag]}
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
          placeholder={'업로드 날짜'}
          options={optionsUploadTime}
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
          onKeyDown={handleKeyDown}
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
    </>
  );
};

export default Filter;
