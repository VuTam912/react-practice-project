// import axios from 'axios';
// call API o component theo chuc nang cua no
// ko phai App,TableUsers.js

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

// DEL - DELETE - delete
const deleteUser = (id) => {
	console.log(id);
	return axios.delete(`/api/users/${id}`);
};

// return all object and not use default
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };
