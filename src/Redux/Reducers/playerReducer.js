import { ADD_USER, UPDATE_SCORE } from '../Actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER: {
    return { ...state, name: payload.name, gravatarEmail: payload.gravatarEmail };
  }
  case UPDATE_SCORE: {
    const firstNumber = 10; const hard = 3; const medium = 2; const easy = 1;
    let sumScore = 0;
    if (payload.difficulty === 'hard') {
      sumScore = firstNumber + (payload.timer * hard);
    } else if (payload.difficulty === 'medium') {
      sumScore = firstNumber + (payload.timer * medium);
    } else {
      sumScore = firstNumber + (payload.timer * easy);
    }
    return { ...state, score: state.score + sumScore };
  }
  default:
    return state;
  }
};

export default player;
