import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const content = {
  mt: 2,
  padding: 2,
  borderRadius: 1,
  boxShadow: 3,
  maxHeight: '300px',
  overflow: 'auto',
};

const TypeNewsModal = ({ open, closeModal, articles, code }) => {
  const filteredArticles = articles.filter((news) => news.articleCode === code);
  if (filteredArticles.length === 0) {
    return null;
  }

  const article = filteredArticles[0];
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {article.title}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {article.formattedCreatedDate}
        </Typography>
        <Typography sx={content}>{article.text}</Typography>
      </Box>
    </Modal>
  );
};

export default TypeNewsModal;
