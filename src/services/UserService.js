// import axios from 'axios';
import axios from './customize-axios';

// page là phân trang
const fetchAllUser = (page) => {
	return axios.get(`/api/users?page=${page}`);
};

// return a object and not use default
export { fetchAllUser };
