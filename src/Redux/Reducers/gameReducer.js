import {
  GET_QUESTIONS,
  INITIAL_REQUEST,
  NEXT_QUESTION,
  RESET_INDEX,
} from '../Actions/actionTypes';

const INITIAL_STATE = {
  loading: true,
  code: 0,
  questions: [],
  indexQuestionAtual: 0,
};

const game = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      indexQuestionAtual: state.indexQuestionAtual + 1,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      code: payload.response_code,
      questions: payload.results,
      loading: false,
    };
  case RESET_INDEX:
    return {
      ...state,
      indexQuestionAtual: 0,
    };
  default:
    return state;
  }
};

export default game;
