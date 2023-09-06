import axios from 'axios';
const fetchAllUser = () => {
	return axios.get('https://reqres.in/api/users?page=1');
};

// return a object and not use default
export { fetchAllUser };
