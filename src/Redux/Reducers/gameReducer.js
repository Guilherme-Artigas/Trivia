import { GET_QUESTIONS, INITIAL_REQUEST } from '../Actions/actionTypes';
import shufflesAnswers from '../../utils/randomizer';

const INITIAL_STATE = {
  loading: true,
  code: 0,
  questions: [],
  currentQuestion: {},
  indexQuestionAtual: 0,
};

const game = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case GET_QUESTIONS:
    console.log(payload);
    return {
      ...state,
      code: payload.response_code,
      questions: payload.results,
      currentQuestion: shufflesAnswers(
        payload.results[state.indexQuestionAtual],
      ),
      loading: false,
    };
  default:
    return state;
  }
};

export default game;
