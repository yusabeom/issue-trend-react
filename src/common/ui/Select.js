import { Box, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Select = ({ placeholder, options, select }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    // console.log('value: ', e.target.value);
    setSelectedValue(e.target.value); // key값
    select(e.target.value);
  };

  // 최대 높이보다 더 많은 선택지가 있으면 스크롤바 생성
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // 최대 높이 설정 (200px)
        width: 250,
      },
    },
  };

  return (
    <div>
      <Box sx={{ width: '160px' }}>
        <TextField
          label={placeholder}
          select
          fullWidth
          value={selectedValue}
          onChange={handleSelectChange}
          SelectProps={{ MenuProps }}
        >
          {/* <MenuItem value='seoul'>Seoul</MenuItem> */}

          {Object.entries(options).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
};

export default Select;
