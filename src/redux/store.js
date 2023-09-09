import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';
// redux-devtools
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
