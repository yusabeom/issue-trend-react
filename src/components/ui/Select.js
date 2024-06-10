import { Box, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Select = ({ placeholder, options, addNewTag }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    // console.log('value: ', e.target.value);
    setSelectedValue(e.target.value);
    addNewTag(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Box sx={{ width: '300px' }}>
        <TextField
          label={placeholder}
          select
          fullWidth
          value={selectedValue}
          onChange={handleSelectChange}
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
