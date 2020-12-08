import { REDUX_ACTION_TYPE } from 'app-constants';

const initialState = {
  profilePictureUrl: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUX_ACTION_TYPE.CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        ...{
          profilePictureUrl: action.payload,
        },
      };
    default:
      return state;
  }
};
