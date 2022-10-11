import {
  ADD_USER,
  GET_QUESTIONS,
  INITIAL_REQUEST,
  NEXT_QUESTION,
  RESET_INDEX,
  RESET_SCORE,
  UPDATE_SCORE,
} from './actionTypes';

import { getQuestions } from '../../utils/requestApi';

export const addUser = (payload) => ({ type: ADD_USER, payload });

export const initialRequest = () => ({ type: INITIAL_REQUEST });

export const sendQuestions = (payload) => ({ type: GET_QUESTIONS, payload });

export const nextQuestion = () => ({ type: NEXT_QUESTION });

export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });

export const resetIndex = () => ({ type: RESET_INDEX });

export const resetScore = () => ({ type: RESET_SCORE });

export const resetGame = () => (dispatch) => {
  dispatch(resetIndex());
  return dispatch(resetScore());
};

export const requestQuestions = (token) => async (dispatch) => {
  dispatch(initialRequest());
  const responseAPI = await getQuestions(token);
  dispatch(sendQuestions(responseAPI));
};
