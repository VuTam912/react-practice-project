import * as type from '../actions/userAction';

const INITIAL_STATE = {
	account: {
		email: '',
		auth: null, // fix bug to toast be not displayed
		token: '',
	},
	// to show Loading (button) or not
	isLoading: false,
	isError: false,
};

const userRedcuer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.FETCH_USER_LOGIN:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case type.FETCH_USER_ERROR:
			return {
				...state,
				account: {
					auth: false,
				},
				isLoading: false,
				isError: true,
			};

		case type.FETCH_USER_SUCCESS:
			console.log('>>> check action: ', action);
			return {
				...state,
				account: {
					email: action.data.email,
					token: action.data.token,
					auth: true,
				},
				isLoading: false,
				isError: false,
			};

		case type.USER_LOGOUT:
			localStorage.removeItem('email');
			localStorage.removeItem('token');
			return {
				...state,
				account: {
					email: '',
					token: '',
					auth: false,
				},
			};
		case type.USER_REFRESH:
			return {
				...state,
				account: {
					email: localStorage.getItem('email'),
					token: localStorage.getItem('token'),
					auth: true,
				},
			};

		default:
			return state;
	}
};

export default userRedcuer;
