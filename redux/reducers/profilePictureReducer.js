import { REDUX_ACTION_TYPE } from 'app-constants';

import auth from '@react-native-firebase/auth';

const initialState = {
  profilePictureUrl: auth().currentUser ? auth().currentUser.photoURL || '' : '',
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
