export const initialState = {
  userValue: {
    email: '',
    password: '',
    //address: '',
  },

  message: {
    email: '',
    password: '',
    passwordCheck: '',
    //address: '',
  },

  correct: {
    email: false,
    password: false,
    passwordCheck: false,
  },
};
// action.type: 어떠한 상태의 값을 변경하려 하는지에 대한 값
// action.key: 입력창이 어디인지
// action.value: 입력값이 무엇인지
export const joinReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_VALUE':
      return {
        ...state,
        userValue: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };

    case 'SET_CORRECT':
      return {
        ...state,
        correct: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
};
