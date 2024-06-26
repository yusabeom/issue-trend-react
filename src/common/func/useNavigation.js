import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const goPage = (page) => () => {
    navigate(page);
  };

  return {
    goLogin: goPage('/login'),
    goJoin: goPage('/join'),
    goHome: goPage('/home'),
    goNews: goPage('/news'),
    goBoard: goPage('/board'),
    goMyPage: goPage('/issue-trend/mypage'),
    goRegionInfo: goPage('/region-info'),
  };
};

export default useNavigation;
