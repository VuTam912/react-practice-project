// import axios from 'axios';
import axios from './customize-axios';

//tham so page là phân trang
const fetchAllUser = (page) => {
	return axios.get(`/api/users?page=${page}`);
};

// POST - create
const postCreateUser = (name, job) => {
	return axios.post(`/api/users`, { name, job });
};

// PUT - UPDATE - update
const putUpdateUser = (name, job) => {
	return axios.put(`/api/users/`, { name, job });
};

// return all object and not use default
export { fetchAllUser, postCreateUser, putUpdateUser };
