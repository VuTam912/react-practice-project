// import axios from 'axios';
import axios from './customize-axios';

// page là phân trang
const fetchAllUser = (page) => {
	return axios.get(`/api/users?page=${page}`);
};

// POST - create
const postCreateUser = (name, job) => {
	return axios.post(`/api/users`, { name, job });
};

// return a object and not use default
export { fetchAllUser, postCreateUser };
