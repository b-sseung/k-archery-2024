// 리듀서 통합 모듈
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import game from './game';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    //SSR작업 수행 시 HYDRATE라는 액션을 통해서 서버의 스토어와 클라이언트의 스토어를 합쳐주는 작업을 수행한다.
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    //정의한 리듀서 모듈들을 결합하는 역할을 한다.
    game,
  })(state, action);
};

export default reducer;
