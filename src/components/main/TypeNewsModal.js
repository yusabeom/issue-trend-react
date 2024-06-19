import { Box, Modal, Typography } from '@mui/material';
import { lineHeight, maxHeight } from '@mui/system';
import React from 'react';
import styles from '../../styles/TypeNewsModal.module.scss';

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
      <Box className={styles.style}>
        <Typography
          className={styles.header}
          id='modal-modal-title'
          variant='h6'
          component='h2'
        >
          뉴스기사
        </Typography>
        <div className={styles.contentContainer}>
          <Typography className={styles.title}>{article.title}</Typography>
          <Typography id='modal-modal-description' className={styles.date}>
            {article.formattedCreatedDate}
          </Typography>
          <Typography className={styles.imgBox}>
            <img src={article.img} />
          </Typography>
          <Typography className={styles.content}>{article.text}</Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default TypeNewsModal;
