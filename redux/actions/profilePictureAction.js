import { REDUX_ACTION_TYPE } from 'app-constants';

const setProfilePictureUrl = (url) => {
  return (dispatch) => {
    dispatch({
      payload: url,
      type: REDUX_ACTION_TYPE.CHANGE_PROFILE_PICTURE,
    });
  };
};

export default {
  setProfilePictureUrl,
};
