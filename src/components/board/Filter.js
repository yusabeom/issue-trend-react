import { Box, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from '../ui/Select';
import styles from '../../style/Filter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const optionsRegion = {
    se: '서울',
    in: '인천',
    kk: '경기',
  };

  const optionsUploadTime = {
    hour: '1시간 전',
    day: '오늘',
    week: '이번주',
  };

  const [tags, setTags] = useState([]);
  // tags = ['in', 'se', 'today'];

  useEffect(() => {});

  // 태그가 바뀔 때마다 태그에 관련된 필터링을 서버에 요청
  useEffect(() => {
    // fetch() or axios()
  }, [tags]);

  // 태그에 요소 추가
  const addNewTag = (key) => {
    // filter-tag 태그에 새로운 태그 붙이기
    console.log('key: ', key);
    const content = optionsRegion[key];
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
          prevTags.filter(
            (tag) => tag !== 'hour' && tag !== 'day' && tag !== 'week',
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

  // 태그에 요소 제거
  const removeTag = (e) => {
    const content = e.target.parentElement.parentElement.textContent;
    console.log('이벤트 발생: ', content);
    setTags((prevTags) => prevTags.filter((tag) => tag !== content));
  };

  return (
    <>
      <div className={styles.filterTag}>
        {tags.map((tag) => (
          <div key={tag} className={styles.tag}>
            {optionsRegion[tag] || optionsUploadTime[tag]} &nbsp;
            <FontAwesomeIcon icon={faX} size='xs' onClick={removeTag} />
          </div>
        ))}
      </div>

      <div className={styles.filter}>
        <Select
          className='selection'
          placeholder={'지역'}
          options={optionsRegion}
          addNewTag={addNewTag}
        />
        <br />
        <Select
          className='selection'
          placeholder={'업로드 날짜'}
          options={optionsUploadTime}
          addNewTag={addNewTag}
        />
      </div>
    </>
  );
};

export default Filter;
