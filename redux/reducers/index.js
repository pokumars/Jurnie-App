import { combineReducers } from 'redux';

import profilePictureReducer from './profilePictureReducer';

const rootReducer = combineReducers({
  profilePictureReducer,
});

export default rootReducer;
