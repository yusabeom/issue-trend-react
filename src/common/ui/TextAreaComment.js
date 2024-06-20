import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import styles from '../../styles/TextareaComment.module.scss';
import profileImage from '../../assets/img/anonymous.jpg';
import { debounce } from 'lodash';
import { Alert } from '@mui/material';

// 댓글 UI
// newComment: 작성 후 submit한 댓글, initialValue: 댓글 초기값, type: 수정(modify) or 작성(insert)여부
export default function TextareaComment({ newComment, initialValue, type }) {
  // AuthContext에서 로그인 상태를 가져옵니다. (Header.js 참고)
  // userName을 가져오고 프로필 이미지 요청

  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [replyComment, setReplyComment] = React.useState(
    type === 'modify' ? initialValue : '',
  ); // input창 댓글
  const [openAlert, setOpenAlert] = React.useState(false); // 댓글 alert 메세지 여부
  const scrollRef = React.useRef(null);

  // debounce 함수 생성
  // const debouncedReplyTextHandler = React.useCallback(
  //   debounce((value) => {
  //     setReplyComment(value);
  //   }, 300),
  //   [],
  // );

  const replyTextHandler = (e) => {
    setReplyComment(e.target.value);
    // console.log(replyComment);
  };

  const replySubmetHandler = (e) => {
    // console.log('submitted 댓글: ', replyComment);
    if (replyComment.trim() === '') {
      setOpenAlert(true);
      scrollToBottom();
      return;
    }
    newComment(replyComment);
    setReplyComment('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  return (
    <FormControl>
      {type === 'insert' && (
        <FormLabel>
          <div className={styles.profile}>
            <img src={profileImage} alt='댓글 작성자 프로필 사진' />
          </div>
          <span className={styles.loginUser}>서정원</span>
        </FormLabel>
      )}
      {openAlert && (
        <Alert style={{ marginBottom: '1rem' }} severity='warning'>
          댓글을 작성해주세요
        </Alert>
      )}
      <Textarea
        onChange={replyTextHandler}
        onSubmit={replySubmetHandler}
        value={replyComment}
        placeholder='댓글을 작성해주세요'
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <IconButton
              variant='plain'
              color='neutral'
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize='md' />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size='sm'
              placement='bottom-start'
              sx={{ '--ListItemDecorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize='sm' />}
                  </ListItemDecorator>
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: 'auto' }} onClick={replySubmetHandler}>
              {type === 'modify' ? '수정' : '작성'}
            </Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
  );
}
