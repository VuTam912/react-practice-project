import { combineReducers } from 'redux';

import userReducer from './userRedcuer';

const rootReducer = combineReducers({
	user: userReducer,
});

export default rootReducer;
