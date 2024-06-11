import React from 'react';
import '../../styles/Join.css';
import anonymous from '../../assets/img/anonymous.jpg';
import { Button } from '@mui/material';
import Header from '../../common/layout/Header';

const Join = () => {
  return (
    <>
      <Header />
      <div className='aspect-ratio'>
        <div className='sns-container'>
          <div></div>
          <div>
            <div>
              <h6>SNS 회원가입</h6>
            </div>
            <div></div>
          </div>
        </div>

        <div className='hr-container'>
          <div></div>
          <div className='hr-sect'>* 표시는 필수 작성입니다</div>
        </div>

        <div>
          <form className='form-container'>
            <div className='image_container'>
              <img src={anonymous} />

              <button>사진 올리기</button>
            </div>
            <div className='user-input-form'>
              <div>
                <label htmlFor='email' className='label'>
                  아이디*
                </label>
                <span className='warn'></span>
                <input id='email' type='email' />
              </div>

              <div>
                <label htmlFor='pw'>비밀번호*</label>
                <span className='warn'></span>
                <input id='pw' />
              </div>

              <div>
                <label htmlFor='pwCheck'>비밀번호 확인*</label>
                <span className='warn'></span>
                <input id='pwCheck' />
              </div>

              <div>
                <label htmlFor='pwCheck'>비밀번호 확인*</label>
                <span className='warn'></span>
                <input id='pwCheck' />
              </div>

              <div>
                <label htmlFor='mb'>핸드폰 번호*</label>
                <span className='warn'></span>
                <input id='mb' />
              </div>

              <div>
                <label htmlFor='mbCheck'>인증번호*</label>
                <span className='warn'></span>
                <input id='mbCheck' />
              </div>

              <div>
                <label htmlFor='nick'>닉네임*</label>
                <span className='warn'></span>
                <input id='nick' />
              </div>

              <div>
                <label htmlFor='addr'>주소*</label>
                <span className='warn'></span>
                <input id='addr' />
              </div>

              <div>
                <h6>관심주제</h6>
                <p>
                  관심주제로 설정한 키워드는 개인 맞춤 이슈를 제공하기 위해
                  사용됩니다.
                </p>
                <input />
                <div className='add-list'>
                  <ul>
                    <li>기획</li>
                    <li>퇴근</li>
                    <li>출근</li>
                    <li>출근</li>
                    <li>출근</li>
                  </ul>
                </div>
              </div>

              <div>
                <Button
                  type='submit'
                  fullWidth
                  style={{ background: 'black', color: 'white' }}
                >
                  회원가입
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className='login-container'>
          <div></div>
          <div>
            <span>이미 회원이신가요?</span>
            <a>로그인</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
