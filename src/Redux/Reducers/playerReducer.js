import { ADD_USER } from '../Actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
