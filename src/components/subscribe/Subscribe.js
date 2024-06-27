import React from 'react';
import styles from '../../styles/Subscibe.module.scss';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import img from '../../assets/img/newspaper.jpg';
import pay from '../../assets/img/payment.png';

const Subscribe = () => {
  const { head, content, payBox } = styles;
  return (
    <>
      <div className={head}>
        <h1>구독하기</h1>
        <h2>
          구독하시면 등록한 관심키워드 관련 기사를 이메일로 받을 수 있습니다.
        </h2>
      </div>
      <Card sx={{ maxWidth: 500, margin: '0 auto' }}>
        <CardMedia component='img' alt='paper' height='400' image={img} />
        <div className={content}>
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              안녕하세요! 우리 서비스는 구독을 통해 가입 시 입력한 키워드를
              기반으로 관련된 최신 기사를 이메일로 받아보실 수 있는 시스템을
              제공합니다. 구독을 통해 원하는 정보와 뉴스를 빠르고 간편하게
              확인하세요!
            </Typography>
          </CardContent>
          <CardActions className={payBox}>
            <Typography gutterBottom variant='h5' component='div'>
              9,900원
            </Typography>

            <img src={pay} />
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default Subscribe;
