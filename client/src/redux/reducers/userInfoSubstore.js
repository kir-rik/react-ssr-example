import { CHANGE_USERNAME } from '../actionTypes';

const initialState = {
  userName: 'Noname',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME: {
      const { userName } = action.payload;

      return {
        ...state,
        userName,
      };
    }


    default:
      return state;
  }
}
