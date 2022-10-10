import { ADD_USER, GET_QUESTIONS, INITIAL_REQUEST, NEXT_QUESTION, UPDATE_SCORE } from './actionTypes';

import { getQuestions } from '../../utils/requestApi';

export const addUser = (payload) => ({ type: ADD_USER, payload });

export const initialRequest = () => ({ type: INITIAL_REQUEST });

export const sendQuestions = (payload) => ({ type: GET_QUESTIONS, payload });

export const nextQuestion = () => ({ type: NEXT_QUESTION });
export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });

export const requestQuestions = (token) => async (dispatch) => {
  dispatch(initialRequest());
  const responseAPI = await getQuestions(token);
  dispatch(sendQuestions(responseAPI));
};
