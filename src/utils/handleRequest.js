/*
이 코드는 주어진 요청 함수를 비동기적으로 호출하고, 
그 결과에 따라 성공 처리, 오류 처리,
로그아웃 및 리디렉션을 수행하는 유틸리티 함수입니다.
*/

const handleError = (error, onLogout, redirection) => {
  console.log('handleError 호출됨!');
  if (error.response && error.response.status === 401) {
    if (error.response.data.message === 'INVALID_AUTH') {
      console.log(error.response.data.korean);
      alert('로그인이 필요한 서비스 입니다.');
      redirection('/login');
    } else if (error.response.data.message === 'EXPIRED_TOKEN') {
      alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.');
      onLogout();
      redirection('/');
    }
  } else if (error.response && error.response.status === 400) {
    // 400 error 에 대한 내용
  } else if (error.response && error.response.status === 403) {
    // 403 error 에 대한 내용
  }
};

const handleRequest = async (requestFunc, onSuccess, onLogout, redirection) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, redirection);
  }
};

export default handleRequest;
